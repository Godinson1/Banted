const router = require('express').Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/userModels');
const auth = require('../middleware/auth');
const Follow = require('../models/followModel');
const Banter = require('../models/bantModel');
const Like = require('../models/likeModel');
const upload = require('../Helpers/multer');
const { isEmail } = require('../Helpers/helper');



//Get authenticated user Users
router.route('/').get(auth, (req, res) => {
    let userData = {};
    User.find({handle: {$eq: req.user.handle}})
        .select('-password')
        .then(user => {
            userData.credentials = user;
            Like.find({userHandle: {$eq: req.user.handle}})
                .then(likes => {
                    userData.likes = [];
                    userData.likes.push(likes);
                    return res.json(userData);
                })
        })
        .catch(err => {
            console.log(err);
            return res.json(500).json({ message: "Something went Wrong!" });
        });
});


//All users
router.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!" })
    }
    
})


//Register User
router.route('/register').post( async (req, res) => {

    //Destructure fields from request body
    const { name, handle, email, password } = req.body;

    //Check for valid email
    if(!isEmail(email)) return res.status(400).json({ error: "Must be a valid email address!" })

    try {

    //Check for existing email
    const emailExist = await User.findOne({ email });
    if(emailExist) return res.status(400).json({ error: `User with ${email} already exist!` });

    //Check for existing handle
    const user = await User.findOne({ handle });
    if (user) return res.status(400).json({ error: `@${handle} is already taken. Try another!` });
    
    //Create new User
    const userDetails = new User({
        name,
        handle,
        email,
        password,
        followers: 0,
        following: 0
    });

    //Hash password before saving to database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userDetails.password, salt, async (err, hash) => {
            if (err) throw err;
            userDetails.password = hash;
        
            //Save new user to database
            const user = await userDetails.save();

            //Sign Up user with Jwt token
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
                    });
                }
            );
        });
    });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong!" });
    }
});


//Login User
router.route('/login').post( async (req, res) => {

    //Destructure fields from request body
    const { email, password } = req.body;

    //Check for valid email
    if(!isEmail(email)) return res.status(400).json({ error: "Must be a valid email address" });

    try {
     
    //Check for existing user with email
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error: "User does not exist.." });

    //Compare hashed password to check validity
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ error: "Invalid credentials.." });

    //Log user in with token
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
            });
        }
    );

    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong.." })
    }                   
            
});



//Follow a User
router.route('/:id/follow').get(auth, async (req, res) => {

    let userData;

    try {
        
    //Find user by Id and store in variable userDoc
    const userDoc = await User.findById(req.params.id);
    userData = userDoc;

    //Check if user is already followed - Return error if true otherwise follow user
    const isFollowed = await Follow.findOne({$and: [{handle: {$eq: userData.handle}}, {followerId: {$eq: req.user.id}}]});
    if(isFollowed) {
        return res.status(400).json({ message: "User already followed.." });
    } else {
        const newFollowed = new Follow({
            name: userData.name,
            handle: userData.handle,
            userId: userData._id,
            followerId: req.user.id,
            followerHandle: req.user.handle
        });
    
        await newFollowed.save();
        userData.followers++;
        const userFollowed = await userData.save();
        const userFollowing = await User.findById(req.user.id);
        userFollowing.following++;
        await userFollowing.save();
        return res.status(200).json({message: `You followed @${userFollowed.handle}`});
    }

    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    } 
            
});


//Get Authenticated User
router.get('/:handle', auth, async (req, res) => {
    let userData = {};

    try {
         //Find user and exclude password
    const user = await User.find({handle: {$eq: req.params.handle}}).select('-password');
    
    //Check if user exists - If true return error otherwise get user
    if(user == '') {
        return res.status(400).json({ message: `User with @${req.params.handle} not found` });
    } else {
        userData.userInformation = user;
        const followers = await Follow.find({handle: {$eq: req.params.handle}}).sort({createdAt: -1});
        userData.followers = followers;
        const following = await Follow.find({followerHandle: {$eq: req.params.handle}});
        userData.following = following;
        const banters = await Banter.find({banterHandle: {$eq: req.params.handle}}).sort({createdAt: -1});
        userData.banters = banters;
        return res.status(200).json(userData);
    }
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong.." });
    }
            
});


//Unfollow User
router.route('/:id/unfollow').get(auth, async (req, res) => {
    let userData;

    try {

        //Find user to unfollow - if not found return error else store user
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            userData = user;
        }

        //Check if user is followed - if not followed return error else unfollow
        const isFollowed = await Follow.find({$and: [{userId: {$eq: req.params.id}}, {followerId: {$eq: req.user.id}}]});
        if(isFollowed == '') {
            return res.status(400).json({ message: "User not followed.." });
        } else {
            userData.followers--;
            await userData.save();
            const user = await User.findById(req.user.id);
            user.following--;
            await user.save();

            //Delete follow document and return message
            await Follow.deleteOne({$and: [{userId: {$eq: req.params.id}}, {followerId: {$eq: req.user.id}}]});
            return res.status(200).json({ message: `You unfollowed @${userData.handle}` });
        }

    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!" });
    }
        
            
});


//Upload profile picture
router.post("/:id/profile-image", upload.single('userImage'), auth, async (req, res) => {
    
    //Store file in variable profileImage
    const profileImage = req.file;

    //Check if param id equals logged in user id - If not return error
    if (req.params.id !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

   
    try {

        //Find user by id and update with uploaded file name
        const user = await User.findById(req.params.id);
        user.userImage = profileImage.filename;
        await user.save();
        return res.status(200).json({ message: "Profile Image Updated Successfully!" });

    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong!" });
    }
            
});


//Get Banters for Authenticated User's timeline
router.route('/user/timeline').get(auth, async (req, res) => {

    try {
        let followerHandle = [];

        //Retrieve all user handles in follow doc
        const follow = await Follow.find({followerId: {$eq: req.user.id}});
        follow.map(handle => {
            followerHandle.push(handle.handle);
        });
    
        //Find all banter - Followers or authenticated user
        const associatedBanters = await Banter.find({$or: [{banterHandle: {$eq: req.user.handle}}, {banterHandle: {$in: followerHandle}}]}).sort({createdAt: -1});
        if(associatedBanters == '') return res.status(400).json({ message: "No banters Yet!.. Create one or follow other banted users to see banters.." })
        return res.status(200).json(associatedBanters);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong.." });
    }
            
               
});


module.exports = router;