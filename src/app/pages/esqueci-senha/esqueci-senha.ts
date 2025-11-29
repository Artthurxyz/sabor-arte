import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-esqueci-senha',
  imports: [CommonModule, FormsModule, RouterLink, Header, Footer],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css',
  standalone: true
})
export class EsqueciSenha {
  email: string = '';
  emailSent: boolean = false;

  onSubmit() {
    console.log('Recuperar senha:', this.email);
    this.emailSent = true;
  }
}
