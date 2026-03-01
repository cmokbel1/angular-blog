
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly formbuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);

  isLoading = signal<boolean>(false);
  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    const loginForm = this.loginForm;
    if (!loginForm.valid) {
      return;
    }

    if (
      !loginForm.controls.username.value ||
      !loginForm.controls.password.value
    ) {
      return;
    }

    const params = {
      username: loginForm.controls.username.value,
      password: loginForm.controls.password.value,
    };

    this.isLoading.set(true);
    this.authService
      .loginUser(params)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          console.log('Login successful');
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
  }

  openRegisterDialog() {
    this.dialogService.open(RegisterComponent, {
      header: 'Register',
      closable: true,
    });
  }
}
