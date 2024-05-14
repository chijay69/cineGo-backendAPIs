import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { userRepository} from '../repository/UserRepository'
import { User } from "../entity/User";
import * as cache from "memory-cache";


dotenv.config();


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Check if token in cache matches the token in the request
    // Get token from cache
    const cachedToken = await cache.get('jwtToken');
    if (cachedToken !== token) {
        return res.status(401).json({ message: "Unauthorized: Token is not the same as cached value." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        return res.status(401).json({ message: "Unauthorized: Could not verify token." });
    }

    req[" currentuser"] = decode;
    
    next();
};


export const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRepo = userRepository(User);
        const user = await userRepo.findOne({
            where: { id: req[" currentuser"].id },
        });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Restricted access to user" });
        }

        const userRole: any[] = user.roles;

        console.log(userRole);
        
        const hasPermission = roles.some(role => userRole.includes(role));

        console.log(hasPermission)
        if (!hasPermission) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
