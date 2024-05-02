import { EntityTarget } from "typeorm";
import { User } from "../entity/User";
import { Payload, UserResponse } from "../dto/User.dto";

export const UserService = (user: User)=> {
    const userDataResponse = new UserResponse;
    userDataResponse.email = user.email
    userDataResponse.firstName = user.firstName
    userDataResponse.lastName = user.lastName
    // userDataResponse.role = user.roles

    const userPayload = new Payload();
    userPayload.id = user.id
    userPayload.issuer = user.email
    return {userDataResponse, userPayload};
}