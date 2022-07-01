const router = require("express").Router();
const { verifyauth, verifyadmin } = require("./verifeytoken");
const Prodects = require("../Modules/Prodects");

//CRRATE
router.post("/", verifyadmin, async (req, res) => {
  const newProdect = new Prodects(req.body);
  try {
    const saveprodect = await newProdect.save();
    res.status(200).json(saveprodect);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyadmin, async (req, res) => {
  try {
    const updateprodect = await Prodects.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateprodect);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyadmin, async (req, res) => {
  try {
    await Prodects.findByIdAndDelete(req.params.id);
    res.status(200).json("Prodect Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GEToneprodect
router.get("/:id", async (req, res) => {
  try {
    const oneprodect = await Prodects.findById(req.params.id);
    res.status(200).json(oneprodect);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GETAllPRODECTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCatgory = req.query.catgory;
  try {
    let arryProdect;
    if (qNew) {
      arryProdect = await Prodects.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCatgory) {
      arryProdect = await Prodects.find({
        catgory: { $in: [qCatgory] },
      });
    } else {
      arryProdect = await Prodects.find();
    }
    res.status(200).json(arryProdect);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
