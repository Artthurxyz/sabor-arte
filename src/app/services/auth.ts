import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isAuthenticated = false;
  private currentUser: { name: string; email: string } | null = null;

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(name: string, email: string): void {
    this.isAuthenticated = true;
    this.currentUser = { name, email };
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }
}
