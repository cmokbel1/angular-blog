import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from './passwordMatch.validator';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { RequestCredentials } from 'src/app/shared/global.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthService);
  private readonly dialogRef = inject(DynamicDialogRef);
  isLoading = signal<boolean>(false);

  registerForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    },
    { validators: passwordMatchValidator },
  );

  onSubmit(): void {
    this.isLoading.set(true);
    console.log(this.registerForm.value, 'register button clicked');
    if (this.registerForm.valid) {
      const payload: RequestCredentials = {
        username: this.registerForm.controls.username.value ?? '',
        password: this.registerForm.controls.password.value ?? '',
      };

      this.authService.registerUser(payload);
      this.dialogRef.close();
    }
    this.isLoading.set(false);
  }
}
