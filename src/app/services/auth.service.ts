import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService: UserService;
  constructor() {
    this.userService = inject(UserService);
  }

  isAuthenticated(): boolean {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    return loggedUser != null;
  }

  loginUser(email: string, password: string) {
    if (email === "admin@admin.com" && password === "admin123") {
      localStorage.setItem("loggedUser", JSON.stringify({ email, password }));
      return true;
    }
    return false;
  }

  logoutUser() {
    localStorage.removeItem("loggedUser");
  }
}
