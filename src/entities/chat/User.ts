export class User {
    userName: string;
    phoneNumber: string;
    gender: String;
    avatar: string;

    constructor(userName: string, phoneNumber: string, gender: string, avatar: string) {
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.userName = userName;
        this.avatar = avatar;

    }


}