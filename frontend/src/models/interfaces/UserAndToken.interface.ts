import { UserModel } from "../entities/User.model";

interface UserAndToken {
    user: UserModel;
    authToken: string;
}

export type { UserAndToken };
