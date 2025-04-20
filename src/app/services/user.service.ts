import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.api, userData);
  }

  login(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}?email=${email}`);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.api}/${user.id}`, user);
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api); // Assuming this.api = 'http://localhost:3000/users'
  }
  

}
