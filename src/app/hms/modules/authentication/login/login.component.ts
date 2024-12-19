// angular import
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FirstKeyPipe } from 'src/app/shared/pipes/first-key.pipe';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, RouterLink, FirstKeyPipe, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  constructor(
    public formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router) { }
  isSubmitted: boolean = false;
  baseURL = environment.apiUrl;
  errorMessage: string | null = null;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = null; // Reset error message before submission
  
    if (this.form.valid) {
      this.http.post(`${this.baseURL}/Account/signin`, this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/home');
        },
        error: err => {
          if (err.status === 400) {
            // Check if the server response has a specific message
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Incorrect email or password.';
            }
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
            console.error('Error during login:', err);
          }
        }
      });
    }
  }
  
}
