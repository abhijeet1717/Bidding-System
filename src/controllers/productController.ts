import Product from "../models/productModel";
import {Request, Response} from "express";
import { dbConnection } from '../database/db.connection';
import exp from "constants";
import { Op } from "sequelize";
import path from "path";
import multer from "../middleware/multer";
import fs from 'fs';
import { addProduct, bidProduct, deleteProduct, getProduct, updateProduct, addImage } from "../services/productServices"; 

// addproduct API
export async function addproduct(req: Request, res: Response) {
    try {
      const result = await addProduct(req);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
  // bid product API
  export async function bidproduct(req: Request, res: Response) {
    try {
      const result = await bidProduct(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

 // delete product API
    export async function deleteproduct(req: Request, res: Response) {
    try {
      const result = await deleteProduct(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // update product API
    export async function updateproduct(req: Request, res: Response) {
    try {
      const result = await updateProduct(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
// get product API
export async function getproduct(req: Request, res: Response) {
    try {
      const products = await getProduct(req);
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }


  // addProductImage API
export async function addProductImage(req: Request, res: Response) {
    try {
      const result = await addImage(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  

// //addproduct api
// export async function addproduct(req: Request, res: Response){
//     const{product_name, description, product_images, base_price} = req.body;
//     console.log(req.body);
//     const uid = String(req.userId);
//     console.log(uid);

//     try {
//     const newProduct = await Product.create({
//         product_name: product_name,
//         description: description,
//         product_images: product_images,
//         base_price: base_price,
//         user_id: uid
//     });
//         //await newProduct.save();
//         const products = await Product.findOne({where:{user_id: uid}, raw: true});
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
// }

// //  bid product api
// export async function bidproduct(req: Request, res: Response){
//     try{
//     // const id = req.params.id;
//     const{id, bidding}= req.body;
//     const uid = String(req.userId);
//     const bidproduct = await Product.findOne({where:{id: id}});
//     if(!bidproduct){
//         return res.status(404).json({ message: "product not found" });
//     }
//     if(bidproduct){
//         const check1:any = await Product.findOne({where:{id: id,user_id:uid}});
//         if(check1){
//           return res.status(400).send("You cannot bid on your own product")
//         }
//         else if (bidproduct.base_price >= bidding) {
//           return res
//             .status(400)
//             .send("bidding prize should greater than basePrice");
//         }
//         const result = await Product.update(
//           { newBiddingPrice: bidding, bidder_id: uid },
//           { where: { id: id } })
  
//       } 
//       else{
//         return res.status(400).send("Product not found");
//       }
//     bidproduct.bidder_id = +uid;
//     bidproduct.bidding = bidding
//     await bidproduct.save();
//         res.status(200).json({message : "Bidding done successfully on product"});
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});
//     }
// }

// // //delete product api
// export async function deleteproduct(req: Request, res: Response){
//     const id =req.params.id;
//     const uid = req.userId;
//     try {
//         const deleteproduct = await Product.findOne({where:{user_id: uid}});
//         if(!deleteproduct){
//             return res.status(404).json({ message: "product not found" });
//         }
//         await Product.destroy({where: {user_id: uid}});
//         res.status(200).json({message: "product deleted successfully"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});   
//     }
// }

// //update product api
// export async function updateproduct(req: Request, res: Response) {
//     const id =req.params.id;
//     const{product_name, description, product_images, base_price} = req.body;
//     const uid = req.userId;
//     const updateproduct = await Product.findOne({where:{id: id}});
//     try {
//         if(!updateproduct){
//             return res.status(404).json({ message: "product not found" });
//         }
//         await Product.update(
//           {
//             product_name: product_name,
//             description: description,
//             product_images: product_images,
//             base_price: base_price,
//           },
//           { where: { id: id } }
//         );
//         return res.status(200).send("Product updated successfully");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
//   }

// //getproduct api
// export async function getproduct(req: Request, res: Response){
//     const uid = String(req.userId);
//     console.log(uid);
//     try {
//         const products = await Product.findAll({where:{ user_id:{[Op.ne]: uid}}, raw: true});
//         res.status(200).json(products);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
// }

// //addProductImage API
// export async function addProductImage(req: Request, res: Response) {
//     //const uid: any = req.userId;
//     const id = Number(req.params.id);
  
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
  
//     if (!id) {
//       return res.status(400).json({ error: "Product id not found" });
//     }
  
//     const imagePath = "./public/uploads/" + req.file.originalname;
//     const productPic = fs.readFileSync(path.resolve(imagePath));
  
//     try {
//       const product: any = await Product.findOne({ where: { id: id } });
//       //console.log(product);
//       console.log("hii");
//       if (!product) {
//         return res.status(400).json({ error: "No Such Product Found" });
//       }
//     //   product.product_images = productPic;
//       const imagePath = path.resolve(req.file.path);
//       const productPic = fs.readFileSync(imagePath);

//       product.product_images = productPic;

//       await product.save();

//       fs.renameSync(req.file.path, path.resolve(imagePath));
  
//       return res.status(200).json({ message: "Product Image updated successfully" });
//     } catch (error) {
//       console.error("Error in addProductImage:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

