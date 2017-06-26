import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';
import {Message} from '../../entities/chat/Message';

let SERVER_URL = 'http://ec2-52-89-54-132.us-west-2.compute.amazonaws.com:9092';

@Injectable()
export class ChatService {
    private socket;

    constructor() {
        this.initSocket();
    }

    private initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('chatevent', message);
    }

    public get() {
        let observable = new Observable(observer => {
            this.socket.on('chatevent', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

}
