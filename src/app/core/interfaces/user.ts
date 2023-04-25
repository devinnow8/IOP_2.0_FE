export interface SignIn {
    username_email: string,
    password: string
}

export interface SignUp {
    user_id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    password: string,
    last_login: string
}

export interface User {
    email: string;
    jwt: string;
    name: string;
    user_id: number;
}