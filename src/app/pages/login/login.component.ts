import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  updateEmailErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      this.emailError = 'Campo e-mail deve ser preenchido';
    } else if (emailControl?.hasError('email')) {
      this.emailError = 'Campo e-mail inválido';
    } else {
      this.emailError = '';
    }
  }

  async submitForm() {
    if (!this.loginForm.valid) {
      this.updateEmailErrorMessage();
      this.passwordError = this.loginForm.get('password')?.hasError('required')
        ? 'Campo senha deve ser preenchido'
        : '';
      return;
    }

    try {
      const email = this.loginForm.get('email')?.value || '';
      const password = this.loginForm.get('password')?.value || '';

      const loggedIn = await this.authService.loginUser(email, password);

      if (!loggedIn) {
        this.snackBar.open(
          'Não foi possível logar. Tente novamente com credenciais válidas!',
          'Fechar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
        return;
      }

      this.router.navigate(['form']);
    } catch (error) {
      console.error('Erro durante o login:', error);
      this.snackBar.open('Erro inesperado. Por favor, tente novamente.', 'Fechar', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }
}
