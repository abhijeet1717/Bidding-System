import User from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "secret";
import {Request, Response} from "express";
import { blob } from 'stream/consumers';
import Session from '../models/sessionModel';
import { dbConnection } from '../database/db.connection';
import { createUser, loginUser, logoutUser, getUserProfile, deleteUserProfile, updateUserProfile, forgetUserPassword} from "../services/userServices";
// import User from '../models/userModel';

//signup API
export async function signup(req: Request, res: Response) {
    const result = await createUser(req);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.status(201).json(result);
  }
  
  //login API
  export async function login(req: Request, res: Response) {
    const result = await loginUser(req);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    res.status(201).json(result);
  }

  //logout API
export async function logout(req: Request, res: Response) {
    try {
      const result = await logoutUser(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

//getprofile API
export async function getProfile(req: Request, res: Response) {
    try {
      const result = await getUserProfile(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

   //deleteprofile API
export async function deleteProfile(req: Request, res: Response) {
    try {
      const result = await deleteUserProfile(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

//update profile api
export async function updateProfile(req: Request, res: Response) {
    try {
      const result = await updateUserProfile(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

//forgot password api
export async function forgetPassword(req: Request, res: Response) {
    try {
      const result = await forgetUserPassword(req);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }


// //signup API
// export  async function signup (req: Request, res: Response) {
//     const {username, email, password, status, profile, mobile_number, gender, dob, favoriteBook} = req.body;
//     try{
//         const existingUser: any = await User.findOne({where : {email : email}, raw: true});
//         if(existingUser){
//             return res.status(400).json({message: "user already exist"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const result = await User.create({
//                 username: username,
//                 email: email,
//                 password: hashedPassword,
//                 status : status,
//                 profile : blob,
//                 mobile_number : mobile_number,
//                 gender : gender,
//                 dob : dob,
//                 favoriteBook: favoriteBook
//     });
//     res.status(201).json({user: result});
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//      }   
// }

// //login API
// export  async function login (req: Request, res: Response) {
//     const {email, password} = req.body;
//     try {
//         const existingUser = await User.findOne({where : {email : email}, raw: true});
//         if(!existingUser){
//             return res.status(404).json({message: "user not found"});
//         }
//             const matchPassword = await bcrypt.compare(password, existingUser.password);
//             if(!matchPassword){
//                 return res.status(400).json({message: "invalid credentials"});
//             }
            
//             const token = jwt.sign({email: existingUser.email, id: existingUser.id}, SECRET_KEY, {expiresIn: '1h'});
//             res.status(201).json({message : "Logged in successfully", token: token});
//                 await Session.create({
//                 uid: existingUser.id,
//                 isUserActive: true
//             });
       
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// //logout API
// export async function logout(req: Request, res: Response) {
//     try {
//         const userId= req.userId;
//         if(!userId){
//            return res.status(401).json({message: "Unauthorized"});
//         }

//         const session = await Session.findOne({where: {user_id: userId}})

//         if(!session){
//             return res.status(401).json({message: "Session not found"});
//         }

//         await session.update({isUserActive: false});

//         res.status(200).json({message: "Logout successful"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// //getprofile API
// export async function getprofile(req: Request, res: Response){
//     try {
//     let token = req.headers.authorization.split(" ")[1];
//         if(!token){
//             res.status(401).json({message : "Invalid Token"});
//         }else{
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const email = decoded.email;

//         const getUserProfile = await User.findOne({where:{email: email}});
//         if(!getUserProfile){
//             return res.status(404).json({ message: "User profile not found" });
//         }
//         res.status(200).json(getUserProfile);
//         }
//     } 
//     catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// //deleteprofile API
// export async function deleteprofile(req: Request, res: Response){
//     try {
//     let token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//         if(!token){
//             res.status(401).json({message : "Invalid Token"});
//         }else{
//         const decoded = jwt.verify(token, SECRET_KEY);
//         console.log(decoded);
//         const email = decoded.email;

//         const deleteUserProfile = await User.findOne({where:{email: email}});
//         if(!deleteUserProfile){
//             return res.status(404).json({ message: "User profile not found" });
//         }
//         await User.destroy({where: {email: email} });
//         res.status(200).json({message: "user profile deleted successfully"});
//         }
//     } 
//     catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// //update profile api
// export async function updateprofile(req: Request, res: Response){
//     try {
//         let token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//         if(!token){
//             res.status(401).json({message : "Invalid Token"});
//         }
//         else{
//             const decoded = jwt.verify(token, SECRET_KEY);
//             const email = decoded.email;

//         const updateUserProfile = await User.findOne({where:{email: email}});
//         if(!updateUserProfile){
//             return res.status(404).json({ message: "User profile not found" });
//         }
//         const {username, password} = req.body;
//         if(username){
//             updateUserProfile.username = username;
//         }
//         if(password){
//             const hashedPassword = await bcrypt.hash(password, 10);
//             updateUserProfile.password = hashedPassword;
//         }
//         await updateUserProfile.save();
//         res.status(200).json({message : "User Profile updated successfully"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// //forgot password api
// export async function forgetPassword(req: Request, res: Response){
//     try {
//         const email = req.body.email;
//         const favoriteBook = req.body.favoriteBook;
//         const isEmailExist = await User.findOne({where:{email: email}});
//         if(!isEmailExist){
//             return res.status(404).json({message: "email does not exist"});
//         }
//         const existingUser = await User.findOne({where : {email : email}, raw: true});
//         if(favoriteBook === existingUser.favoriteBook){
//             const token = jwt.sign({email: existingUser.email, id: existingUser.id}, SECRET_KEY, {expiresIn: '1h'});
//             res.status(201).json({message : "Logged in successfully", token: token});
//                 await Session.create({
//                 uid: existingUser.id,
//                 isUserActive: true
//             });
//         }
//         else{
//             return res.status(404).json({ message: "security question failed!!"});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }
