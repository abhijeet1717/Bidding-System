// services/productServices.ts

import Product from "../models/productModel";
import { Request } from "express";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import { errorMsg2 } from "../messages/constants";

export async function addProduct(req: Request) {
  try {
    const { product_name, description, product_images, base_price } = req.body;
    const uid = String(req.userId);

    const newProduct = await Product.create({
      product_name: product_name,
      description: description,
      product_images: product_images,
      base_price: base_price,
      user_id: uid,
    });

    const products = await Product.findOne({ where: { user_id: uid }, raw: true });

    return { newProduct, products };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function bidProduct(req: Request) {
  try {
    const { id, bidding } = req.body;
    const uid = String(req.userId);

    const bidProduct = await Product.findOne({ where: { id } });
    if (!bidProduct) {
      throw new Error("Product not found");
    }

    if (bidProduct.user_id === uid) {
      throw new Error("You cannot bid on your own product");
    } else if (bidProduct.base_price >= bidding) {
      throw new Error("Bidding price should be greater than basePrice");
    }

    await Product.update(
      { newBiddingPrice: bidding, bidder_id: uid },
      { where: { id } }
    );

    bidProduct.bidder_id = +uid;
    bidProduct.bidding = bidding;
    await bidProduct.save();

    return { message: "Bidding done successfully on product" };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function deleteProduct(req: Request) {
    const id = req.params.id;
    const uid = req.userId;
    try {
      const deleteProduct = await Product.findOne({ where: { id, user_id: uid } });
      if (!deleteProduct) {
        throw new Error("Product not found");
      }
      await Product.destroy({ where: { id, user_id: uid } });
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }


  export async function updateProduct(req: Request) {
    const id = req.params.id;
    const { product_name, description, product_images, base_price } = req.body;
    try {
      const updateProduct = await Product.findOne({ where: { id } });
      if (!updateProduct) {
        throw new Error("Product not found");
      }
      await Product.update(
        {
          product_name: product_name,
          description: description,
          product_images: product_images,
          base_price: base_price,
        },
        { where: { id } }
      );
      return { message: "Product updated successfully" };
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }

  export async function getProduct(req: Request) {
    const uid = String(req.userId);
    try {
      const products = await Product.findAll({
        where: { user_id: { [Op.ne]: uid } },
        raw: true,
      });
      return products;
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }

  export async function addImage(req: Request) {
    const id = Number(req.params.id);
  
    if (!req.file) {
      throw new Error("No file uploaded");
    }
  
    if (!id) {
      throw new Error("Product id not found");
    }
  
    const imagePath = "./public/uploads/" + req.file.originalname;
    const productPic = fs.readFileSync(path.resolve(imagePath));
  
    try {
      const product: any = await Product.findOne({ where: { id } });
      if (!product) {
        throw new Error("No Such Product Found");
      }
  
      const imagePath = path.resolve(req.file.path);
      const productPic = fs.readFileSync(imagePath);
  
      product.product_images = productPic;
  
      await product.save();
  
      fs.renameSync(req.file.path, path.resolve(imagePath));
  
      return { message: "Product Image updated successfully" };
    } catch (error) {
      console.error("Error in addProductImage:", error);
      throw new Error("Internal Server Error");
    }
  }
    