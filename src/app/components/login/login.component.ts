
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly formbuilder = inject(FormBuilder);
  private readonly dialogService = inject(DialogService);
  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    // Handle login logic here
  }
  openRegisterDialog() {
    this.dialogService.open(RegisterComponent, {
      header: 'Register',
      width: '400px',
      closable: true,
    });
  }
}
