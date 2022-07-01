const router = require("express").Router();
const { verifyauth, verifyadmin, verify } = require("./verifeytoken");
const Cart = require("../Modules/Cart");

//CRRATE
router.post("/", verify, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //UPDATE
router.put("/:id", verifyauth, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyauth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// // //GET User Cart
router.get("/:id", verifyauth, async (req, res) => {
  try {
    const oneCart = await Cart.findOne({ _id: req.params.id });
    res.status(200).json(oneCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// // //GETAllPRODECTS
router.get("/", verifyadmin, async (req, res) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
