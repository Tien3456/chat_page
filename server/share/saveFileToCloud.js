const cloudinary = require('cloudinary').v2

module.exports = (path, resource_type = "auto", folder = "chatapp") => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(path, {
            resource_type: resource_type,
            folder: folder
        }, (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}