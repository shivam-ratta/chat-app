import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('chatBody') chatBody!: ElementRef;
  chatForm: any = FormGroup;
  isChatWindowLoading = false;
  isMessage = false;
  isReply = false;
  isTyping = false;
  isChatWindow = false;
  messageInput: any = '';
  message: any = '';
  reply: any = [];
  htmlToAdd: any;
  constructor(
    private http: HttpClient,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  sendMessage() {
    console.log(this.message)
    this.isMessage = true;
    this.message = this.messageInput;
    setTimeout(() => {
      this.isReply = true;
      this.messageInput = '';
  
      this.reply.push({
        text: this.message
      })
    }, 500)

    setTimeout(() => {
      const reply = [{
        isResponse: true,
        text: 'Here are some resultsthat we found'
      },
      {
        isResponse: true,
        text: 'Name: Shivam'
      },
      {
        isResponse: true,
        text: 'Email: 123@gmail.com'
      },
      {
        isResponse: true,
        text: 'Age: 25'
      }]
      this.reply = [...this.reply, ...reply];
      this.processReplies();
      this.scrollToBottom();
    }, 1000)

  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }, 50)
  }

  showChatWindow() {
    this.isChatWindow = true;
    setTimeout(() => {
      this.isChatWindowLoading = true;
    }, 500)
  }
  closeChatWindow() {
    this.isChatWindow = false;
  }

  processReplies() {
    let isFirst = true;
    this.reply.forEach((el: any) => {
      if (el.isResponse) {
        el.isLogo = isFirst;
        isFirst = false;
      } else {
        isFirst = true;
      }

    });
  }
}
