# Ecommerce Project Documentation Day 16 (Followup class 15)

## Industrial Attachment - NIET

## Overview

- Update User Info
- Upload User Photo

### Update User Controller

```javascript
const editProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const updateFields = {};

  //  available fields to update
  const fields = ["name", "email", "phone", "address"];

  // fill up updateFields with the fields that are present in the request body
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  try {
    await findUserAndUpdateProfile(
      req.user.id,
      updateFields,
      req?.file?.filename
    );

    return res
      .status(200)
      .send({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};
```

### Main Logic

```javascript
const thumbImageGenerator = (thumb) => {
  if (thumb) {
    if (thumb.includes("thumb")) {
      let link =
        process.env.SYSTEM_ENV == "development"
          ? `http://localhost:5000/thumbnails/${thumb}`
          : `https://code-duniya.onrender.com/uploads/${thumb}`;
      return link;
    } else if (thumb.includes("avatar")) {
      let link =
        process.env.SYSTEM_ENV == "development"
          ? `http://localhost:5000/avatars/${thumb}`
          : `https://code-duniya.onrender.com/uploads/${thumb}`;
      return link;
    }
  }
};

const findUserAndUpdateProfile = async (id, updateFields, avatarPath) => {
  try {
    let targetUser = await findUserById(id);

    await userModel.findOneAndUpdate(
      { _id: targetUser._id },
      { $set: { ...updateFields, avatar: thumbImageGenerator(avatarPath) } }
    );

    if (avatarPath && !targetUser.avatar.includes("flaticon")) {
      let thumb = targetUser.avatar.split("/");
      let fileName = thumb[thumb.length - 1];

      await deleteFile(fileName);
    }
  } catch (error) {
    throw new Error("Error updating course: " + error.message);
  }
};
```

### File Upload Middleware

```javascript
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Creates a dynamic multer upload middleware
 * @param {Object} options - options object
 * @param {'thumb'|'video' | 'avatar'} options.type - upload type
 * @returns multer middleware
 */
const createUploadMiddleware = ({ type }) => {
  // Set allowed types and limits
  let allowedTypes = [];
  let maxSize = 0;
  let folderName = "";

  if (type === "thumb") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "thumbnails";
  } else if (type === "avatar") {
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    maxSize = 5 * 1024 * 1024; // 5MB
    folderName = "avatars";
  } else if (type === "video") {
    allowedTypes = ["video/mp4", "video/mkv", "video/webm"];
    maxSize = 100 * 1024 * 1024; // 100MB
    folderName = "videos";
  } else {
    throw new Error("Invalid upload type. Must be 'image' or 'video'.");
  }

  // Storage configuration
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `./uploads/${folderName}`;
      // Ensure folder exists
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  // Filter
  const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${type}.`), false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

module.exports = createUploadMiddleware;
```
