import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor() { }

  async loginUser(email: string, password: string): Promise<boolean> {
    if (email.includes('@')) {
      this.authenticated = true;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
