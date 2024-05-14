import { Request, Response } from "express";
import { userRepository } from '../../repository/UserRepository'
import { User } from "../../entity/User";
import * as cache from "memory-cache";
import { UserService } from "../../service/UserService";
import { ProfileResponse } from "../../dto/Profile.dto";

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const user = await userRepository(User).findOne({
        where: { id: req["currentUser"].id },
        relations: ["profile"]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { userDataResponse } = UserService(user);
      const profileDto = new ProfileResponse();
      profileDto.profileName = user.profile.profileName;
      profileDto.profileAvatar = user.profile.profileAvatar;
      profileDto.Rratings = user.profile.Rratings;

      return res.status(200).json({ ...userDataResponse, ...profileDto });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserBilling(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userRepository(User).findOne({
        where: { id: parseInt(id) },
        relations: ['billing']
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User billing data", billing: user.billing });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      let usersData = cache.get("usersdata");
      if (!usersData) {
        console.log("serving from db");
        const users: any[] = await userRepository(User).find();
        cache.put("usersdata", users, 6000);
        usersData = users;
      } else {
        console.log("serving from cache");
      }

      return res.status(200).json({ usersData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const { firstName, lastName, email, country } = req.body;
      const userRepo = userRepository(User);
      const id = parseInt(ids)
      let user = await userRepo.findOne({
          where: { id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (country) user.country = country;

      await userRepo.save(user);
      res.status(200).json({ message: "User updated", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { ids } = req.params;
      const id = parseInt(ids);
      const userRepo = userRepository(User);
      const user = await userRepo.findOne({
          where: { id },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await userRepo.remove(user);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async home(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Hello world" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
