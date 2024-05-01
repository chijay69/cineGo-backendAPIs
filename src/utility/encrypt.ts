import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Payload } from '../dto/User.dto';
import { client } from "./redis";
import { Token } from "../entity/Token";
import { TokenRepository } from "../repository/TokenRepository";


dotenv.config();

const { JWT_SECRET = "" } = process.env;

export class encrypt {
    static async encryptpass(password: string){
        return bcrypt.hashSync(password, 14);
    };

    static comparepass(password: string, hashpassword:string){
        return bcrypt.compareSync(password, hashpassword);
    };

    static async generateToken(payload: Payload){
        const jwtToken =  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d", issuer: payload.issuer});

        // Set token in cache
        client.set('jwtToken', jwtToken);

        // deactivate existing tokens
        const tokenRepository = TokenRepository(Token);

        await tokenRepository.update({ userId: payload.id }, { isActive: false });
        

        const tokenEntity = new Token();
        tokenEntity.token = jwtToken;
        tokenEntity.userId = payload.id;

        await tokenRepository.save(tokenEntity);

        return jwtToken;
    };

}

export const validateEmail = (email) => {
    return true;
}

export const validatePassword = (password) => {
    return true;
}