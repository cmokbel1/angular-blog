import { DialogService } from 'primeng/dynamicdialog';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from './passwordMatch.validator';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DialogService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly dialogService = inject(DialogService);

  registerForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordMatchValidator },
  );

  onSubmit(): void {
    console.log(this.registerForm.value);
  }
}
