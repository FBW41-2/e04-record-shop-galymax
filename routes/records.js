const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})
const upload = multer({storage})

const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord
} = require("../controllers/recordsController");

router
  .route("/")
  .get(getRecords)
  .post(auth, isAdmin, addRecord);

router
  .route("/:id")
  .get(getRecord)
  .delete(auth, isAdmin, deleteRecord)
  .put(auth, isAdmin, upload.single("img"), updateRecord);

module.exports = router;
