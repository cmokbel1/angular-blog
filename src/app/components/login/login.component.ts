
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly formbuilder = inject(FormBuilder)
  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    // Handle login logic here
  }
}
