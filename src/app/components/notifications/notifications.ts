import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
  standalone: true
})
export class Notifications {
  showNotifications = false;
  
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nova receita',
      message: 'Bolo de Chocolate foi adicionado',
      time: 'há 5 minutos',
      read: false
    },
    {
      id: 2,
      title: 'Comentário',
      message: 'Alguém comentou na sua receita',
      time: 'há 1 hora',
      read: false
    },
    {
      id: 3,
      title: 'Bem-vindo',
      message: 'Obrigado por se juntar ao Sabor & Arte!',
      time: 'há 2 dias',
      read: true
    }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  clearAll() {
    this.notifications = [];
    this.showNotifications = false;
  }
}
