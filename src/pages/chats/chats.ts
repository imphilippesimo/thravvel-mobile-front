import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { User } from '../../entities/chat/User';
import { Message } from '../../entities/chat/Message';
import { ChatService } from '../../providers/chat/chat-service';
import { AuthService } from '../../providers/auth-service'
import { } from "module";

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
  providers: [Keyboard,ChatService]
  
})
export class ChatsPage {

  private user: User;
  private messages: Message[];
  private messageContent: string;
  private ioConnection: any;
  //private currentTime: number;
  

  constructor(public navCtrl: NavController, public keyboard: Keyboard, public navParams: NavParams, private chatService: ChatService, private authService: AuthService) { }

  ionViewDidLoad() {
    this.initModel();
    this.initIoConnection();
    console.log('ionViewDidLoad ChatsPage');

  }

  private initModel(): void {
    /**
     * Getting the current authenticated user from auth-service
     */
    this.user = this.authService.getCurrentUser();
    this.messages = [];
  }

  private initIoConnection(): void {
    this.ioConnection = this.chatService.get().subscribe((message: Message) => {
      console.log(message);
      this.messages.push(message);
    });
  }



  sendMessage(): void {
    /**
     *  We are contructing a message with phoneNumber( or userName) cause the server in not yet 
     * adapted to take custom objects in message body; TODO: change message parameters, 
     * got to take a user entity instead of phoneNumber/username
     */
   // this.currentTime = Date.now();

    var message: Message = new Message(this.user.userName, this.messageContent);
    this.chatService.send(message);
    //console.log(message);
    this.messageContent = null;
  }

  closeKeyboard(): void {
    this.keyboard.close();

  };




}
