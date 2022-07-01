const router = require("express").Router();
const { verifyauth, verifyadmin } = require("./verifeytoken");
const User = require("../Modules/Users");

//UPDATE
router.put("/:id", verifyauth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SCRIT_KEY
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyauth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GEToneUser
router.get("/get/:id", verifyadmin, async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.id);
    const { password, ...info } = oneUser._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GETAllUser
router.get("/allUser", verifyadmin, async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USERS STATS
router.get("/stats", verifyadmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: { _id: "$month", total: { $sum: 1 } },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
