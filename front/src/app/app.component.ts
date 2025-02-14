import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewChecked {
  currentDate: Date = new Date();

  ws = new WebSocket('ws://localhost:8081/chat');
  status = '';
  clients = [1];
  clientMessage: string[] = [];
  messageQueue: string[] = [];
  users: string[] = [
    'Foxy',
    'Rex',
    'Gemini',
    'Luke',
    'Bruce',
    'Candy',
    'Rocky',
  ];
  activeUsers: string[] = [];

  avatars = ['assets/corgi.png', 'assets/pug.png', 'assets/fox.png'];

  @ViewChildren('messageContainer') messageContainer!: QueryList<ElementRef>;

  ngOnInit() {
    this.activeUsers.push('Support');
    this.handleSocketEvents();
    // this.randomizeNamesArray();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  randomizeNamesArray() {
    const newArray = [];

    for (let i = 0; i < this.users.length; i++) {
      const randomIndex = Math.floor(Math.random() * this.users.length);
      newArray.push(this.users[randomIndex]);
      this.users.splice(randomIndex, 1);
    }

    this.users = newArray;
    this.activeUsers.push(this.users[0]);
  }

  scrollToBottom() {
    this.messageContainer.forEach((container) => {
      const el = container.nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }

  handleSocketEvents() {
    this.ws.onopen = (c: any) => {
      console.log(c);
      this.status = 'Connection established: ' + c.target.url;
    };
    this.ws.onerror = (e: any) => {
      console.log(e);
      this.status = 'Error encountered';
    };
    this.ws.onclose = (c: any) => {
      console.log(c);
      this.status = 'Closed connection';
    };
    this.ws.onmessage = (message: any) => {
      console.log(message);
      this.status = `Message received`;
      this.broadcastMessage(message);
    };
  }

  addClient() {
    const user = this.users[this.activeUsers.length];
    if (user) this.activeUsers.push(user);
    else
      this.activeUsers.push(
        `Guest ${this.activeUsers.length + this.users.length + 1}`
      );
  }

  send(index: number) {
    const message = this.clientMessage[index];
    if (!message) return;

    this.ws.send(this.activeUsers[index]);
    this.ws.send(message);
    this.clientMessage[index] = '';
  }

  broadcastMessage(message: any) {
    this.messageQueue.push(message.data);
  }
}
