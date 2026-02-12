const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const { getMe, updateMe, uploadAvatar } = require("../controllers/user.controller");

router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);

// avatar upload
router.post("/me/avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
