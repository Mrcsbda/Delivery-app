export class User {
    static REF = "users"
    key;
    name;
    role;
    email;
    phone;
    avatar;
    birthday;
    loginMethod;
    paymentMethods;
    address;
    createdAt;
    updatedAt;
}

export const LOGIN_METHOD = {
    "GOOGLE": "GOOGLE",
    "EMAIL": "EMAIL"
}

export const ROLE = {
    "CLIENT": "CLIENT",
    "SUPER_ADMIN": "SUPER_ADMIN"
}