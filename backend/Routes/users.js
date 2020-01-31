const router = require('express').Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/userModels');
const auth = require('../middleware/auth');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const Follow = require('../models/followModel');
const Banter = require('../models/bantModel');

const DIR = '../public/BantedImages/profileImages/';
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR);
        },
        filename: (req, file, cb) => {
            const filename = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, uuidv4() + '-' + filename);
        }
    });

    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
                 return cb(null, true);
            } else {
                 cb("Error: Images Only!");
            }
        }
    });


//Get all Users
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            return res.json(500).json({ message: "Something went Wrong!" });
        });
});

router.route('/register').post((req, res) => {

    const { name, handle, email, password } = req.body;

    if(!name || !handle || !email || !password) return res.status(400).json({message: "Please enter all details.."});

    User.findOne({handle})
        .then(user => {
            if (user) return res.status(400).json({ message: "This handle is already taken!" });
        });
    
    const userDetails = new User({
        name,
        handle,
        email,
        password,
        followers: 0,
        following: 0
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userDetails.password, salt, (err, hash) => {
            if (err) throw err;
            userDetails.password = hash;
            userDetails.save()
                .then(user => {
                    jwt.sign(
                        {id: user.id, handle: user.handle, userImage: user.userImage},
                        config.get('jwt_Secret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    userId: user.id,
                                    name: user.name,
                                    handle: user.handle,
                                    email: user.email,
                                    followers: user.followers,
                                    following: user.following
                                }
                            })
                        }
                    )
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ message: "Something went wrong!" });
                });
        })
    })
});

router.route('/login').post((req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Please enter all fields.." });

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({ message: "User does not exist.." });

            bcrypt.compare(password, user.password)
                .then(isMatched => {
                    if (!isMatched) return res.status(400).json({ message: "Invalid credentials.." });

                    jwt.sign(
                        {id: user.id, handle: user.handle, userImage: user.userImage},
                        config.get('jwt_Secret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    userId: user.id,
                                    name: user.name,
                                    handle: user.handle,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Something went wrong.." })
        });

});

router.route('/:id/follow').get(auth, (req, res) => {
    let userData;
    const userDoc = User.findById(req.params.id);
    userDoc
        .then(user => {
            userData = user;   
        Follow.findOne({$and: [{handle: {$eq: user.handle}}, {followerId: {$eq: req.user.id}}]})
            .then(data => {
                if(data) {
                    return res.status(400).json({ message: "User already followed.." });
                } else {
                    const followed = new Follow({
                        name: user.name,
                        handle: user.handle,
                        userId: user._id,
                        followerId: req.user.id,
                        followerHandle: req.user.handle
                    });

        followed.save()
            .then(() => {
                userData.followers++;
                userDoc
                    .then(banter => {
                        banter.followers = userData.followers;
                        banter.save()
                            .then(() => {
                                User.findById(req.user.id)
                                .then(data => {
                                    data.following++; 
                                    data.save()
                                        .then(data => {
                                            console.log(data);
                                            return res.status(200).json({message: `You followed @${banter.handle}`});
                                        })
                            })
                        })
                    })
                
            })
                    }
            
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ message: "Something went wrong" });
            })
    })
            
})


//Get Authenticated User
router.get('/:handle', auth, (req, res) => {
    let userData = {};
    User.find({handle: {$eq: req.params.handle}})
        .select('-password')
        .then(data => {
            if(data == '') {
                return res.status(400).json({ message: `User with @${req.params.handle} not found` })
            } else {
                userData.userInformation = data;
            Follow.find({handle: {$eq: req.params.handle}}).sort({createdAt: -1})
                .then(followers => {
                    userData.followers = followers;
                    Follow.find({followerHandle: {$eq: req.params.handle}})
                        .then(following => {
                            userData.following = following;
                            Banter.find({banterHandle: {$eq: req.params.handle}}).sort({createdAt: -1})
                                .then(banter => {
                                    userData.banters = banter;
                                    return res.status(200).json(userData);
                                })
                        })
                })
              
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Something went wrong.." });
        });
});

//Unfollow User
router.route('/:id/unfollow').get(auth, (req, res) => {
    let userData;
    User.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).json({ message: "User not found" });
            } else {
                userData = data;
            }
        })
        .then(data => {
            Follow.find({$and: [{userId: {$eq: req.params.id}}, {followerId: {$eq: req.user.id}}]})
             .then(doc => {
                 if(doc == '') {
                     return res.status(400).json({ message: "User not followed.." })
                 } else {
                userData.followers--;
                User.findById(req.params.id)
                    .then(data => {
                        data.followers = userData.followers;
                        data.save()
                        .then(() => {
                            User.find({_id: req.user.id})
                             .then(data => {
                                data[0].following--;
                                data[0].save()
                                    .then(() => {
                                        Follow.deleteOne({$and: [{userId: {$eq: req.params.id}}, {followerId: {$eq: req.user.id}}]})
                                            .then(() => {
                                                return res.status(200).json({ message: `You unfollowed @${userData.handle}` });
                                            })
                                    })
                            })
                        })
                    })
                 }     
             })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong!" })
        });
});

//Upload profile picture

router.post("/:id/profile-image", upload.single('userImage'), auth, (req, res) => {
    const profileImage = req.file;
    User.findById(req.params.id)
        .then(user => {
            if (req.params.id !== req.user.id) return res.status(401).json({ message: "Unauthorized" })
            user.userImage = profileImage.filename;
            user.save()
                .then(() => res.status(200).json({ message: "Profile Image Updated Successfully!" }))
                .catch(err => {
                     res.status(400).json({ err: err.code })
                })
        })
        .catch(() => res.status(500).json({ error: "Something went wrong!" }))
});

//Get Banters for Authenticated User's timeline
router.route('/user/timeline').get(auth, (req, res) => {
    Follow.find({followerId: {$eq: req.user.id}})
        .then(data => {
            console.log(data);
            let followerHandle = [];
            data.map(handle => {
                followerHandle.push(handle.handle);
            });
            Banter.find({$or: [{banterHandle: {$eq: req.user.handle}}, {banterHandle: {$in: followerHandle}}]}).sort({createdAt: -1})
                .then(banters => {
                    if(banters == '') return res.status(400).json({ message: "No banters Yet!.. Create one or follow other banted users to see banters.." })
                    res.json(banters)
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ message: "Something went wrong.." });
                });
        })
})

module.exports = router;