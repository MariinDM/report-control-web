export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: string;
    active: boolean;
}

export class UserModel {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    role_id!: string;
    active!: boolean;
}