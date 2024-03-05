const express = require('express');
import auth from "../middleware/auth";
import { addproduct, getproduct, deleteproduct, bidproduct, updateproduct, addProductImage} from "../controllers/productController";
import multer from "../middleware/multer"

const productRouter = express.Router();
productRouter.post("/addproduct",auth, addproduct);
productRouter.get("/getproduct",auth, getproduct);
productRouter.put('/bidproduct',auth, bidproduct);
productRouter.put("/updateproduct/:id", auth, updateproduct);
productRouter.delete('/deleteproduct/:id',auth, deleteproduct);
productRouter.post("/addProductImage/:id", auth, multer.upload.single('file'), addProductImage);

export default productRouter;