import { Request, Response, NextFunction } from "express";
import { userRepository} from '../../repository/UserRepository'
import { User } from "../../entity/User";
import { encrypt, validateEmail, validatePassword } from "../../utility/encrypt";
import { UserResponse, Payload } from '../../dto/User.dto';
import * as cache from "memory-cache";
import { UserService } from "../../service/UserService";
import { ProfileResponse } from "../../dto/Profile.dto";
import { authentication, authorization } from "../../middleware/auth.middleware";
import { client } from "../../utility/redis";

export class UserController {
  static async getProfile(req: Request, res: Response) {

    // Middleware to check authentication
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    authentication( req, res, async () => {
      const userRepo = userRepository(User);
      const user = await userRepo.findOne({
        where: { id: req[" currentuser"].id },
        relations: ["Profile"]
      });

      const {userDataResponse} =  UserService(user);

      const profile = user.profile;
      
      const profileDto = new ProfileResponse();
      profileDto.profileName = profile.profileName
      profileDto.profileAvatar = profile.profileAvatar
      profileDto.Rrating = profile.profileAvatar

      return res.status(200).json({ ...userDataResponse, ...profileDto });
    });        
  }

  static async getUsers(req: Request, res: Response) {
    authentication(req, res, async () => {
      const usersdata = await cache.get("usersdata");
      if (usersdata) {
          console.log("serving from cache");
          res.status(200).json({ usersdata });
      } else {
          console.log("serving from db");
          const userRepo = userRepository(User);
          const users: any[] = await userRepo.find();

          await cache.put("usersdata", users, 6000);
          res.status(200).json({ usersdata: users });
        }
    });
  }

  static async updateUser(req: Request, res: Response) {
    // Middleware to check authentication and authorization
    authentication(req, res, () => {
      authorization(['admin'])(req, res, async () => {
        const { ids } = req.params;
        const { firstName, lastName, email, country } = req.body;
        const userRepo = userRepository(User);
        const id = parseInt(ids)
        const user = await userRepo.findOne({
            where: { id },
        });

        // Update only the fields that are provided in the request body
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (country) user.country = country;

        await userRepo.save(user);
        res.status(200).json({ message: "update", user });
      });
    });
  }


  static async deleteUser(req: Request, res: Response) {
    authentication(req, res, () => {
      authorization(['admin'])(req, res, async () => {
          const { ids } = req.params;
          const id = parseInt(ids);
          const userRepo = userRepository(User);
          const user = await userRepo.findOne({
              where: { id },
          });
          await userRepo.remove(user);
          res.status(200).json({ message: "ok" });
      });
    });
  }
}