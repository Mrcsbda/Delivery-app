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

    constructor(
        key,
        name,
        role,
        email,
        phone,
        avatar,
        birthday,
        address,
        loginMethod,
    ) {
        this.key = key;
        this.name = name;
        this.role = role;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar;
        this.birthday = birthday;
        this.loginMethod = loginMethod;
        this.address = address;
        paymentMethods = []
        createdAt = new Date().getTime();
        updatedAt = new Date().getTime();
    }
}

export const LOGIN_METHOD = {
    "GOOGLE": "GOOGLE",
    "EMAIL": "EMAIL"
}

export const ROLE = {
    "CLIENT": "CLIENT",
    "SUPER_ADMIN": "SUPER_ADMIN"
}