const router = require('express').Router();
const Banter = require('../models/bantModel');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const auth = require('../middleware/auth');
const User = require('../models/userModels');
const Comment = require('../models/commentModel');
const Like = require('../models/likeModel');

//Configuring Multer
    const DIR = '../public/BantedImages/BanterImages/';
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
            if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif' || file.mimetype == 'video/mp4') {
                 return cb(null, true);
            } else {
                 cb("Error: Images Only!");
            }
        }
    });

//To upload banter

router.post('/banter', upload.array('banterImage', 4), auth, (req, res) => {

    if(req.body.banter == '') return res.status(400).json({ msg: 'Banter cannot be empty' });

    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }


    const newBanter = {
        banter: req.body.banter,
        banterHandle: req.user.handle,
        banterImage: reqFiles,
        likeCount: 0,
        commentCount: 0,
        userImage: req.user.userImage
    }

    const newBant = new Banter(newBanter);
    newBant.save()
        .then(data => res.json({
            banterId: data._id,
            banter: data.banter,
            banterHandle: data.banterHandle,
            banterImage: data.banterImage,
            likeCount: data.likeCount,
            commentCount: data.commentCount,
            userImage: data.userImage
        }))
        .catch(err => {
            console.log(err);
            return res.status(500).json({ msg: "Something went Wrong" })
        })
});


//To get all banters

router.route('/').get((req, res) => {
    Banter.find().sort({createdAt : -1})
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong!" });
        })
});

//For Comments on Banter

router.route('/:id/comment').post(auth, (req, res) => {
    Banter.findById(req.params.id)
        .then(bant => {
            if(!bant) {
                return res.status(404).json({ error: "Banter not found" });
            }

                const newComment = {
                body: req.body.body,
                banterHandle: req.user.handle,
                banterImage: req.user.userImage,
                banterId: req.params.id
                }

                const comment = new Comment(newComment);
                comment.save()
                    .then(() => {
                        Banter.findById(req.params.id)
                        .then(bant => {
                            bant.commentCount++;
                            bant.save()
                            .then(() => res.json({ message: `You commented on ${bant.banterHandle}'s banter..` }))
                        })
                    })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong" });
        })
});

///For Liking a banter

router.route('/:id/like').get(auth, (req, res) => {
    
    const likeDocument = Like.find({$and: [{userHandle: {$eq: req.user.handle}}, {banterId: {$eq: req.params.id}}]});
    let banterData;
    Banter.findById(req.params.id)
    .then(banter => {
        if (banter) {
            banterData = banter;
            banterData.id = banter._id;
            return likeDocument;
        } else {
            return res.status(404).json({ banter: "Banter not found!" });
        }
        
    })
    .then(data => {
        if(data == '') {
            const likes = new Like({
                banterId: req.params.id,
                userHandle: req.user.handle
            });
            likes.save()
                .then(() => {
                    banterData.likeCount++
                    Banter.findById(req.params.id)
                        .then(data => {
                            data.likeCount = banterData.likeCount;
                            data.save()
                                .then(() => res.json({ message: "Banter liked successfully" }))
                        })
                })
        } else {
            return res.status(400).json({ error: "Banter already liked" })
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong!" })
    })


});

//For unliking banter

router.route('/:id/unlike').get(auth, (req, res) => {
    
    const likeDocument = Like.find({$and: [{userHandle: {$eq: req.user.handle}}, {banterId: {$eq: req.params.id}}]});
    let banterData;
    Banter.findById(req.params.id)
        .then(banter => {
            if (banter) {
                banterData = banter;
                banterData.id = banter._id;
                return likeDocument;
            } else {
                return res.status(404).json({ banter: "Banter not found!" });
            }
            
        })
        .then(data => {
            console.log(data);
            if(data == '') {
                return res.status(400).json({ error: "Banter not liked" })
            } else {
                return Like.deleteOne({userHandle: {$eq: req.user.handle}})
                    .then(() => {
                        banterData.likeCount--;
                        Banter.findById(req.params.id)
                            .then(bant => {
                                bant.likeCount = banterData.likeCount;
                                bant.save()
                                    .then(() => res.json({ message: "Banter Unliked Successfully!" }))
                            })         
                    })
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Something went wrong!" })
        })

});

//Get each Banter with comments

router.route('/:id').get(auth, (req, res) => {
    let banterData;
    Banter.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).json({ error: "Banter not found" });
            }
            banterData = data;
            banterData.banterId = data._id;
        })
        .then(() => {
            Comment.find({banterId: {$eq: req.params.id}}).sort({createdAt : -1})
                .then(comments => {
                  return res.json({
                      banterData,
                      comments
                  });
                })
           
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Something went wrong!" })
        })
});

//Delete a Banter

router.route('/:id').delete(auth, (req, res) => {
   Banter.findById(req.params.id)
        .then(bant => {
            if(!bant) {
                return res.status(404).json({ error: "Banter not found" });
            }
            if (bant.banterHandle !== req.user.handle) {
                    res.status(403).json({ error: "Unauthorised" })
            } else {
                Banter.deleteOne({_id : {$eq: req.params.id}})
                .then(() => {
                    return res.json({ message: "Banter deleted successfully!" })
                })
            }
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: "Something went wrong!" })
            });
});


module.exports = router;