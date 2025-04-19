import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'; // ✅ Add this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService, // ✅ Inject shared auth
    private router: Router
  ) {}

  handleLogin() {
    this.userService.login(this.email).subscribe(users => {
      const user = users[0];

      if (user && user.password === this.password) {
        this.authService.setUser(user); // ✅ Notify all components
        alert(`Welcome, ${user.name}! You have been successfully logged in.`);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
