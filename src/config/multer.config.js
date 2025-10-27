"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './public/upload',
        filename: function (req, file, callback) {
            var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            var ext = (0, path_1.extname)(file.originalname);
            callback(null, "profile-".concat(uniqueSuffix).concat(ext));
        },
    }),
    fileFilter: function (req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            callback(null, true);
        }
        else {
            callback(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
};
