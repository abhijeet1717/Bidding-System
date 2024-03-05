import Address from "../models/addressModel";
import { Request } from "express";

export async function addUserAddress(req: Request) {
  const {
    house_number,
    street_number,
    area,
    landmark,
    city,
    country,
    zip_code,
    state,
    status,
    addressType,
  } = req.body;

  const uid = String(req.userId);

  try {
    const newAddress = await Address.create({
      house_number,
      street_number,
      area,
      landmark,
      city,
      country,
      zip_code,
      state,
      status,
      addressType,
      user_id: uid,
    });

    const addresses = await Address.findOne({ where: { user_id: uid }, raw: true });

    return { newAddress };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function updateUserAddress(req: Request) {
  const id = req.params.id;
  const {
    house_number,
    street_number,
    area,
    landmark,
    city,
    country,
    zip_code,
    state,
    status,
    addressType,
  } = req.body;

  try {
    const updateAddress = await Address.findOne({ where: { id: id } });
    if (!updateAddress) {
      throw new Error("address not found");
    }

    await Address.update(
      {
        house_number,
        street_number,
        area,
        landmark,
        city,
        country,
        zip_code,
        state,
        status,
        addressType,
      },
      { where: { id: id } }
    );

    return { message: "address updated successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function deleteUserAddress(req: Request) {
  const id = req.params.id;
  const uid = req.userId;

  try {
    const deleteAddress = await Address.findOne({ where: { user_id: uid } });
    if (!deleteAddress) {
      throw new Error("address not found");
    }

    await Address.destroy({ where: { user_id: uid } });

    return { message: "address deleted successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}



