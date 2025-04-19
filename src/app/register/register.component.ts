import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  handleRegister() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      likedMovies: [],
      watchLater: [],
      reviews: []
    };

    this.userService.register(newUser).subscribe(() => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    });
  }

  
  
}
