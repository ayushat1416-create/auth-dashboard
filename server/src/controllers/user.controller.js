const User = require("../models/User");

// GET /api/user/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch (err) {
    console.error("GET ME ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/user/me
exports.updateMe = async (req, res) => {
  try {
    const { name } = req.body;

    const updates = {};
    if (name) updates.name = name;

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("UPDATE ME ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/user/me/avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { avatarUrl },
      { new: true }
    ).select("-passwordHash");

    return res.json({
      message: "Avatar uploaded",
      user,
    });
  } catch (err) {
    console.error("UPLOAD AVATAR ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
