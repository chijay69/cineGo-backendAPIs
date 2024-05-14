import { Plans } from "../entity/Plans";

export class Payload {
    id: number;
    issuer: string;
}

export class UserResponse {
    firstName: string;
    lastName: string;
    email: string;
    plan: Plans
}

