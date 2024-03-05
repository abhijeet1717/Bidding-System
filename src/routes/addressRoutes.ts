const express = require('express');
import auth from "../middleware/auth";
import {addAddress, updateAddress, deleteAddress} from "../controllers/addressController";

const addressRouter = express.Router();
addressRouter.post("/addAddress",auth, addAddress);
addressRouter.put("/updateAddress", auth, updateAddress);
addressRouter.post("/deleteAddress",auth, deleteAddress);


export default addressRouter;