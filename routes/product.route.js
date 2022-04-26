// const { Router } = require('express')
const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.get('/', async (req,res,next) => {
    try {
    const result = await Product.find({}, {__v:0});
    res.send(result);
    } catch (error) {
    console.log(error.message);
    }
})

router.post('/',verifyTokenAndAdmin, async (req,res,next) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/:id',verifyTokenAndAdmin, async (req,res,next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.send(product);
    } catch (error) {
        console.log(error.message);
    }
})

// router.patch('/update/:id', async (req,res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         // const options = { new: true };

//         const result = await Product.findOneAndUpdate({_id : id, updatedData}, {})

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// });
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',verifyTokenAndAdmin, async (req,res,next) => {
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;