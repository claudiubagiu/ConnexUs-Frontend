import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: RegisterRequest;

  constructor(private authService: AuthService, private router: Router) {
    this.model = {
      UserName: '',
      Email: '',
      Password: '',
      FirstName: '',
      LastName: '',
      Roles: ['User'],
      Age: undefined,
    };
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.authService.register(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
