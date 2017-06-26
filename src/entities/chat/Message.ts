

export class Message {   
    userName: string;
    message: string;
    time: number;
   
    
    constructor(userName: string, message: string) {
        this.userName = userName;
        this.message = message;
        this.time = Date.now();

    }
}
