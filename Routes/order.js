const router = require("express").Router();
const { verifyauth, verifyadmin, verify } = require("./verifeytoken");
const Order = require("../Modules/Order");

//CRRATE
router.post("/", verify, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //UPDATE
router.put("/:id", verifyadmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //DELETE
router.delete("/:id", verifyadmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// // // //GET User ORDER
router.get("/find/:id", verifyauth, async (req, res) => {
  try {
    const oneOrder = await Order.find({ _id: req.params.id });
    res.status(200).json(oneOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
// // // //GET All  ORDERS
router.get("/", verifyadmin, async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ALL STATS ORDERS
router.get("/stats", verifyadmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const stats = await Order.aggregate([
      {
        $match: { createdAt: { $gte: prevMonth } },
      },

      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      {
        $group: { _id: "$month", total: { $sum: "$sales" } },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
