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

module.exports = upload;