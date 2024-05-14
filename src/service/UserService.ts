import { User } from "../entity/User";
import { Payload, UserResponse } from "../dto/User.dto";

export const UserService = (user: User)=> {
    const userPayload = new Payload();
    userPayload.id = user.id
    userPayload.issuer = user.email

    const userDataResponse = new UserResponse;
    userDataResponse.email = user.email
    userDataResponse.firstName = user.firstName
    userDataResponse.lastName = user.lastName
    userDataResponse.plan = user.plan
    // userDataResponse.role = user.roles
    return {userDataResponse, userPayload};
}