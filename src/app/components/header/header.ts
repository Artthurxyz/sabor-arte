import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Notifications } from '../../notifications/notifications';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Notifications],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    
    if (this.searchTerm.trim()) {
      this.router.navigate(['/receitas'], { 
        queryParams: { search: this.searchTerm } 
      });
    }
  }
}
