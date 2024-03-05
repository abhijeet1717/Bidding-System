import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { blob } from "stream/consumers";
import User from "../models/userModel";
import Session from "../models/sessionModel";
import { errorMsg2 } from "../messages/constants";

const SECRET_KEY = "secret";

export async function createUser(req: Request) {
  const { username, email, password, status, profile, mobile_number, gender, dob, favoriteBook } = req.body;
  try {
    const existingUser: any = await User.findOne({ where: { email }, raw: true });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      status: status,
      profile: blob,
      mobile_number: mobile_number,
      gender: gender,
      dob: dob,
      favoriteBook: favoriteBook,
    });

    return { user: result };
  } catch (error) {
    console.log(error);
    // return { error: "Something went wrong" };
    return {errorMsg2};
  }
}

export async function loginUser(req: Request) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email }, raw: true });
    if (!existingUser) {
      return { error: "User not found" };
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return { error: "Invalid credentials" };
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY, { expiresIn: "1h" });
    // await Session.create({
    //   uid: existingUser.id,
    //   isUserActive: true,
    // });

    return { message: "Logged in successfully", token: token };
  } catch (error) {
    console.log(error);
    // return { error: "Something went wrong" };
    return {errorMsg2};
  }
}

export async function logoutUser(req: Request) {
    try {
      const userId = req.userId;
      if (!userId) {
        throw new Error("Unauthorized");
      }
  
      const session = await Session.findOne({ where: { user_id: userId } });
  
      if (!session) {
        throw new Error("Session not found");
      }
  
      await session.update({ isUserActive: false });
  
      return { message: "Logout successful" };
    } catch (error) {
      console.log(error);
    //   throw new Error("Something went wrong");
      return {errorMsg2};
    }
  }

  export async function getUserProfile(req: Request) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Invalid Token");
      }
  
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      const email = decoded.email;
  
      const getUserProfile = await User.findOne({ where: { email } });
      if (!getUserProfile) {
        throw new Error("User profile not found");
      }
  
      return getUserProfile;
    } catch (error) {
      console.log(error);
    //   throw new Error("Something went wrong");
      return {errorMsg2};
    }
  }

  export async function deleteUserProfile(req: Request) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Invalid Token");
      }
  
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      const email = decoded.email;
  
      const deleteUserProfile = await User.findOne({ where: { email } });
      if (!deleteUserProfile) {
        throw new Error("User profile not found");
      }
  
      await User.destroy({ where: { email } });
  
      return { message: "User profile deleted successfully" };
    } catch (error) {
      console.log(error);
    //   throw new Error("Something went wrong");
      return {errorMsg2};
    }
  }

  export async function updateUserProfile(req: Request) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Invalid Token");
      }
  
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      const email = decoded.email;
  
      const updateUserProfile = await User.findOne({ where: { email } });
      if (!updateUserProfile) {
        throw new Error("User profile not found");
      }
  
      const { username, password } = req.body;
      if (username) {
        updateUserProfile.username = username;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateUserProfile.password = hashedPassword;
      }
      await updateUserProfile.save();
  
      return { message: "User Profile updated successfully" };
    } catch (error) {
      console.log(error);
    //   throw new Error("Something went wrong");
      return {errorMsg2};
    }
  }

  export async function forgetUserPassword(req: Request) {
    try {
      const email = req.body.email;
      const favoriteBook = req.body.favoriteBook;
      const isEmailExist = await User.findOne({ where: { email } });
      if (!isEmailExist) {
        throw new Error("Email does not exist");
      }
  
      const existingUser = await User.findOne({ where: { email }, raw: true });
      if (favoriteBook === existingUser.favoriteBook) {
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY, { expiresIn: "1h" });
        await Session.create({
          uid: existingUser.id,
          isUserActive: true,
        });
  
        return { message: "Logged in successfully", token: token };
      } else {
        throw new Error("Security question failed!!");
      }
    } catch (error) {
      console.log(error);
    //   throw new Error("Something went wrong");
      return {errorMsg2};
    }
  }