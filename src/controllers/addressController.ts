import Address from "../models/addressModel";
import {Request, Response} from "express";
import { dbConnection } from '../database/db.connection';
import { addUserAddress, updateUserAddress, deleteUserAddress } from "../services/addressServices";

// add address api
export async function addAddress(req: Request, res: Response) {
  try {
    const result = await addUserAddress(req);
    res.status(201).json(result.newAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// update address api
export async function updateAddress(req: Request, res: Response) {
    try {
      const result = await updateUserAddress(req);
      res.status(200).send(result.message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  
  // delete address api
  export async function deleteAddress(req: Request, res: Response) {
    try {
      const result = await deleteUserAddress(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }



// //add address api
// export async function addAddress(req: Request, res: Response){
//     const{house_number,street_number,area,landmark,city,country,zip_code,state,status,addressType} = req.body;
//     // console.log(req.body);
//     const uid = String(req.userId);
//     // console.log(uid);

//     try {
//     const newAddress = await Address.create({
//         house_number: house_number,
//         street_number: street_number,
//         area: area,
//         landmark: landmark,
//         city: city,
//         country: country,
//         zip_code: zip_code,
//         state: state,
//         status: status,
//         addressType: addressType,
//         user_id: uid
//     });
//         //await newProduct.save();
//         const addresses = await Address.findOne({where:{user_id: uid}, raw: true});
//         res.status(201).json(newAddress);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
// }

// //update address api
// export async function updateAddress(req: Request, res: Response) {
//     const id =req.params.id;
//     const{house_number,street_number,area,landmark,city,country,zip_code,state,status,addressType} = req.body;
//     const uid = req.userId;
//     const updateAddress = await Address.findOne({where:{id: id}});
//     try {
//         if(!updateAddress){
//             return res.status(404).json({ message: "address not found" });
//         }
//         await Address.update(
//           {
//             house_number: house_number,
//             street_number: street_number,
//             area: area,
//             landmark: landmark,
//             city: city,
//             country: country,
//             zip_code: zip_code,
//             state: state,
//             status: status,
//             addressType: addressType,
//           },
//           { where: { id: id } }
//         );
//         return res.status(200).send("address updated successfully");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
//   }

// //delete address api
// export async function deleteAddress(req: Request, res: Response){
//     const id =req.params.id;
//     const uid = req.userId;
//     try {
//         const deleteaddress = await Address.findOne({where:{user_id: uid}});
//         if(!deleteaddress){
//             return res.status(404).json({ message: "address not found" });
//         }
//         await Address.destroy({where: {user_id: uid}});
//         res.status(200).json({message: "address deleted successfully"});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "something went wrong"});   
//     }
// }