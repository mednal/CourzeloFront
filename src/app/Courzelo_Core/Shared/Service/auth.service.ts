import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Modules/Entity/user';
import { AppConstants } from '../Common/app.constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: { displayName: any; email: any; password: any; matchingPassword: any; }): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }

  forgetPassword(user: {email: any}): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'forgot_password?email=' + user.email, {
      email: user.email
    });
  }

  resetPassword(password: any, resetPasswordToken: any): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'reset_password?token=' + resetPasswordToken + '&password=' + password, {
      password: password,
      resetPasswordToken: resetPasswordToken
    });
  }

  confirmEmail(registerToken: any): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'confirm_email?token=' + registerToken, {
      registerToken: registerToken
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8082/api/auth/all');
  }

  getUserById(id: number): Observable<any>{
    return this.http.get<User>(`http://localhost:8082/api/auth/getUser/${id}`);
  }

  updateUser(user: User, id: number): Observable<User> {
    return this.http.put<User>(`http://localhost:8082/api/auth/update/${id}`, user);
  }


  
  FollowUser(userId: number, currentUser: number){
    return this.http.post(`http://localhost:8082/api/auth/follow/${userId}/${currentUser}`,{});
  } 
  
  UnFollowUser(userId: number, currentUser: number){
    return this.http.post(`http://localhost:8082/api/auth/unfollow/${userId}/${currentUser}`,{});
  }
}
