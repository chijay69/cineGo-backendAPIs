import { Request, Response, response } from "express";
import { userRepository } from "../../repository/UserRepository";
import { User } from "../../entity/User";
import { encrypt, validateEmail, validatePassword } from "../../utility/encrypt";
import { UserService } from "../../service/UserService";

export class AuthController {
    static async signIn (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password){
                return res.status(500).json({ message: "email and password required"})
            }
            
            const userRepo = userRepository(User);
            const user = await userRepo.findOne({
                where: { email }
            });
            const isPasswordValid = encrypt.comparepass(password, user.password)
            if (!user || !isPasswordValid){
                res.status(404).json({message: "User not found!"})
            }

            const {userDataResponse, userPayload} =  UserService(user);

            const token = encrypt.generateToken(userPayload);

            res.status(200).json({ message: "Login successful", userDataResponse, token})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server rror"});
        }
    }


    static async siginUp (req: Request, res: Response) {
        const { firstName, lastName, email, password, role, country, referalCode,  } = req.body;

        if (!validateEmail(email)){
            res.status(403).json({ message: "email format is incorrect"})
        }

        if (!validatePassword(password)){
            res.status(403).json({ message: "password format is incorrect"})
        }
        
        const encryptedPassword = await encrypt.encryptpass(password);
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = encryptedPassword;
        user.roles = role;
        user.country = country;
        user.referalCode = referalCode;

        const userRepo = userRepository(User);
        await userRepo.save(user);

        const {userDataResponse, userPayload} =  UserService(user);

        
        const token = encrypt.generateToken(userPayload);

        return res.status(201).json({ message: "user created Successfully", token, userDataResponse})
    }
}
