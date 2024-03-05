const express = require('express');
import  {signup, login,logout, getProfile, deleteProfile, updateProfile, forgetPassword}  from "../controllers/userController";
import auth from "../middleware/auth"
// import  login from "../controllers/userController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",auth, logout);
router.get("/getprofile",auth, getProfile);
router.delete('/deleteprofile', auth, deleteProfile);
router.put('/updateprofile', auth, updateProfile);
router.post('/forgetpassword', forgetPassword);

export default router;