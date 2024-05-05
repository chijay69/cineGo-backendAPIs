import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Payload } from '../dto/User.dto';
import * as cache from "memory-cache";

dotenv.config();

const { JWT_SECRET } = process.env;

export class encrypt {

    static async encryptpass(password: string){
        return bcrypt.hashSync(password, 14);
    };

    static comparepass(password: string, hashpassword:string){
        return bcrypt.compareSync(password, hashpassword);
    };

    static async generateToken(payload: Payload){
        
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: "1d", issuer: payload.issuer }, (err, token) => {
                if (err) {
                    console.error(`Error occurred while generating token: ${err}`);
                    reject(new Error("Failed to generate token"));
                } else {
                    // Set token in cache
                    cache.put('jwtToken', token);
                    resolve(token);
                }
            });
        });
    }
}

export const validatePassword = (password: string): boolean => {
    // Regular expression to match the email format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_@])[A-Za-z\d-_@]{6,}$/;
    return passwordRegex.test(password);
};

export const validateEmail = (email: string): boolean => {
    // Regular expression for email validation with at least two characters in local and domain parts
    const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}
