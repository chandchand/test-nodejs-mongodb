const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.send("getting all list of vouchers")
})

router.post('/',(req,res,next) => {
    res.send("creating of voucher")
})

router.get('/:id',(req,res,next) => {
    res.send("getting single of voucher")
})

router.patch('/:id',(req,res,next) => {
    res.send("updating single of voucher")
})

router.delete('/:id',(req,res,next) => {
    res.send("deleting single of voucher")
})

module.exports = router;