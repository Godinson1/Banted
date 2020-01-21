const router = require('express').Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/userModels');
const auth = require('../middleware/auth');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

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


router.route('/').get(auth, (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/register').post((req, res) => {
   const { name, username, password, email } = req.body;
   //Simple validation
   if (!name || !username || !password || !email) return res.status(400).json({ msg: "Please enter all details" });

   //Check for existing user
    User.findOne({email})
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exisit" });
        });

    //Create User
    const newUser = new User({
            name,
            username,
            email,
            password
    });

    //Hash password and Register user

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (error, token) => {
                        if (error) throw error;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        })
                    }
                )
            })
        });
        
    })
});


router.route('/login').post((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Kindly fill in all details" });

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({ msg: "User does not exist, Kindly Check again or Register!" });

    //Compare hash password and sign in
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });
            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (error, token) => {
                    if (error) throw error;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    })
                }
            )
        })
    });
       
});

router.route('/user').post(auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

router.post("/:id/profile-image", upload.single('userImage'), auth, (req, res) => {
    const profileImage = req.file;
    User.findById(req.params.id)
        .then(user => {
            user.userImage = profileImage.filename;

            user.save()
                .then(() => res.status(200).json({ message: "Profile Image Updated Successfully!" }))
                .catch(err => {
                     res.status(400).json({ err: err.code })
                })
        })
        .catch(() => res.status(500).json({ error: "Something went wrong!" }))
})

module.exports = router;