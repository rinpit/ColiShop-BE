const express = require("express");
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");
const router = express.Router();
const ProductController = require("../controllers/ProductController")


router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/details/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
router.get('/getAll', ProductController.getAllProduct)


module.exports = router