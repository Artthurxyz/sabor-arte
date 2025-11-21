import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
  standalone: true
})
export class Feedback {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  feedbackSent: boolean = false;

  onSubmit() {
    console.log('Feedback:', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    });
    this.feedbackSent = true;
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.feedbackSent = false;
  }
}
