import { Request, Response, response } from "express";
import { userRepository } from "../../repository/UserRepository";
import { User } from "../../entity/User";
import { encrypt, validateEmail, validatePassword } from "../../utility/encrypt";
import { UserService } from "../../service/UserService";
import { userPlans } from "../../entity/userPlan";
import { validatePlan } from "../../entity/Plans";


export class AuthController {
    static async signIn (req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password){
                return res.status(500).json({ message: "email and password required"});
            }
            
            const userRepo = userRepository(User);
            
            const user = await userRepo.findOne({
                where: { email }
            });

            const isPasswordValid = encrypt.comparepass(password, user.password);

            if (!isPasswordValid){
                res.status(404).json({message: "Invalid password" })
            }

            const {userDataResponse, userPayload} =  UserService(user);

            try {
                const token = await encrypt.generateToken({ id: userPayload.id, issuer: userPayload.issuer });
                res.status(200).json({ message: "Login successful", userDataResponse, token});
            } catch (error) {
                console.error("Failed to generate token");
                throw new Error(error);
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error"});
        }
    }

    static async siginUp (req: Request, res: Response) {
        const { firstName, lastName, email, password, role, country, referalCode, selectedPlanName,  } = req.body;

        if (!validateEmail(email)){
            res.status(403).json({ message: "email format is incorrect"});
        }

        if (!validatePassword(password)){
            res.status(403).json({ message: "password format is incorrect"});
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
        try {
            const selectedPlan = validatePlan(selectedPlanName);
            if (!selectedPlan) {
                console.error(`Plan '${selectedPlanName}' not found`);
                return res.status(500).json({ message: "Invalid plan Selected"});
            }    
            user.plan = selectedPlan;            
        } catch (error) {
            res.status(500).json({message:"Selected does not exist."})
        }
        // Assuming 'user' is an instance of the User entity
        
        const userRepo = userRepository(User);
        await userRepo.save(user);
        
        const {userDataResponse, userPayload} =  UserService(user);
        
        try {
            const token = await encrypt.generateToken({ id: userPayload.id, issuer: userPayload.issuer });
            return res.status(201).json({ message: "User created successfully", token, userDataResponse });
        } catch (error) {
            console.error(error);
            // remove the user
            userRepo.delete(user.id);
            return res.status(500).json({ message: "Failed to generate user" });
        }

    }
}
