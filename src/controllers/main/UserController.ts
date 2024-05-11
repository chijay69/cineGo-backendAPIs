// import { Request, Response } from "express";
// import { userRepository} from '../../repository/UserRepository'
// import { User } from "../../entity/User";
// import * as cache from "memory-cache";
// import { UserService } from "../../service/UserService";
// import { ProfileResponse } from "../../dto/Profile.dto";
// import { authentication, authorization } from "../../middleware/auth.middleware";

// export class UserController {
//   static async getProfile(req: Request, res: Response) {

//     // Middleware to check authentication
//     if (!req[" currentUser"]) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
    
//     authentication( req, res, async () => {
//       const userRepo = userRepository(User);
//       const user = await userRepo.findOne({
//         where: { id: req[" currentuser"].id },
//         relations: ["Profile"]
//       });

//       const {userDataResponse} =  UserService(user);

//       const profile = user.profile;
      
//       const profileDto = new ProfileResponse();
//       profileDto.profileName = profile.profileName
//       profileDto.profileAvatar = profile.profileAvatar
//       profileDto.Rrating = profile.profileAvatar

//       return res.status(200).json({ ...userDataResponse, ...profileDto });
//     });        
//   }

//   static async getUsers(req: Request, res: Response) {
//     authentication(req, res, async () => {
//       const usersdata = await cache.get("usersdata");
//       if (usersdata) {
//           console.log("serving from cache");
//           res.status(200).json({ usersdata });
//       } else {
//           console.log("serving from db");
//           const userRepo = userRepository(User);
//           const users: any[] = await userRepo.find();

//           await cache.put("usersdata", users, 6000);
//           res.status(200).json({ usersdata: users });
//         }
//     });
//   }

//   static async updateUser(req: Request, res: Response) {
//     // Middleware to check authentication and authorization
//     authentication(req, res, () => {
//       authorization(['admin'])(req, res, async () => {
//         const { ids } = req.params;
//         const { firstName, lastName, email, country } = req.body;
//         const userRepo = userRepository(User);
//         const id = parseInt(ids)
//         const user = await userRepo.findOne({
//             where: { id },
//         });

//         // Update only the fields that are provided in the request body
//         if (firstName) user.firstName = firstName;
//         if (lastName) user.lastName = lastName;
//         if (email) user.email = email;
//         if (country) user.country = country;

//         await userRepo.save(user);
//         res.status(200).json({ message: "update", user });
//       });
//     });
//   }


//   static async deleteUser(req: Request, res: Response) {
//     authentication(req, res, () => {
//       authorization(['admin'])(req, res, async () => {
//           const { ids } = req.params;
//           const id = parseInt(ids);
//           const userRepo = userRepository(User);
//           const user = await userRepo.findOne({
//               where: { id },
//           });
//           await userRepo.remove(user);
//           res.status(200).json({ message: "ok" });
//       });
//     });
//   }

//   static async home (req: Request, res: Response ){
//     return res.status(200).json({ message: "hello world"});
//   }
// }


import { Request, Response } from "express";
import { userRepository } from '../../repository/UserRepository'
import { User } from "../../entity/User";
import * as cache from "memory-cache";
import { UserService } from "../../service/UserService";
import { ProfileResponse } from "../../dto/Profile.dto";
import { where } from "sequelize";
import { BillingRepository } from "../../repository/BillingRepository";
import { Billing } from "../../entity/Billing";
import { Status, validateStatus } from "../../entity/Status";
import { Plans, validatePlan } from "../../entity/Plans";
import { userPlans } from "../../entity/userPlan";

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
