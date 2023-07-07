const express = require("express")
const router = express.Router()
const {createStudent, getProfile, deleteProfile, getProfiles} = require("../controllers/studentController")
const upload = require("../utils/multer")

router.post("/profile", upload.fields([{name: "image", maxCount: 30}]), createStudent)
router.get("/students", getProfiles)
router.get("/:id", getProfile)
router.delete("/:id", deleteProfile)


module.exports = router

