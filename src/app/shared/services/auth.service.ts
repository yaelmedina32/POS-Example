import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Using Signals for state management
  currentUser: WritableSignal<User | null> = signal(null);
  isAuthenticated: WritableSignal<boolean> = signal(false);

  constructor(private router: Router) {}

  login(username: string): boolean {
    // Fake login logic
    if (username) {
      const user: User = {
        id: 1,
        username: username,
        role: 'admin',
        name: 'Admin User'
      };
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      
      // Store in localStorage for persistence (optional but good for reload)
      if(typeof window !== 'undefined'){

        localStorage.setItem('user', JSON.stringify(user));
      }
      
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  checkAuth(): boolean {
    // Check localStorage on init
    if(typeof window !== 'undefined'){
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser.set(JSON.parse(storedUser));
        this.isAuthenticated.set(true);
        return true;
      }
    }
    return false;
  }
}
