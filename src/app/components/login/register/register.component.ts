import { RegistrationSuccessMessage } from './../../../shared/message/messages.model'
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
import { BlogMessageService } from 'src/app/services/blog-message-service.service';
import { MessageScopes, RegistrationFailureMessage } from 'src/app/shared/message/messages.model';
import { MessageComponent } from "src/app/shared/message/message.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, MessageComponent],
  providers: [DialogService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly dialogService = inject(DialogService);
  private readonly authService = inject(AuthService);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly messageService = inject(BlogMessageService);

  MessageScopes = MessageScopes
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
    if (this.registerForm.valid) {
      const payload: RequestCredentials = {
        username: this.registerForm.controls.username.value ?? '',
        password: this.registerForm.controls.password.value ?? '',
      };

      this.authService
        .registerUser(payload)
        .pipe(finalize(() => {
          this.isLoading.set(false);
    }))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.messageService.showMessage(RegistrationSuccessMessage);
            this.dialogRef.close();
            return;
            
          },
          error: (error) => {
            console.log(error);
            this.messageService.showMessage(RegistrationFailureMessage);
          },
        });
      return;
    }

    this.isLoading.set(false);
  }
}
