import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink, Header, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  onLogin() {
    if (this.name && this.email) {
      this.dataService.setUser({
        name: this.name,
        email: this.email
      });
      this.router.navigate(['/']);
    }
  }
}
