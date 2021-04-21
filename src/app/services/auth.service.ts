import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  success: number,
  message: string,
  userData: {
    token: string,
    first_name: string, 
    middle_name: string, 
    last_name: string, 
    name: string, 
    email: string, 
    password: string, 
    password_confirmation: string,
    device_name: string, 
    roles: string,
    roleId: string,
    id: number,
    dob: Date,
    designation_id: number,
    department_id: number,       
  };

}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  serverUrl = environment.baseURL;

  private userSubject: BehaviorSubject<AuthResponseData>;
  public user: Observable<AuthResponseData>;

  constructor(private http: HttpClient, private router: Router) { 
    this.userSubject = new BehaviorSubject<AuthResponseData>(JSON.parse(localStorage.getItem('authToken')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): AuthResponseData {
    return this.userSubject.value;    
  }

  login(loginData) {
    return this.http.post<AuthResponseData>(`${this.serverUrl}/login`, loginData)
      .pipe(map((resData: any) => {  
        // store user details and token in local storage to keep user logged in between page refreshes
        localStorage.setItem('authToken', JSON.stringify(resData));
        this.userSubject.next({...resData});
       
      }),
      catchError(this.handleError)

    );
  }

  isLoggedIn() {
    if (localStorage.getItem('authToken')) {
      return true;
    }
      return false;
  }

  getAuthorizationToken() {
    const token_key = JSON.parse(localStorage.getItem('authToken'));
    return token_key.token;
  }  

  register(registerData) {
    return this.http.post<any>(`${this.serverUrl}/register`, registerData);    
  }
  
  loginWithSocialite(provider: any) {
    return this.http.get(`${this.serverUrl}/auth/${provider}`).pipe(map((response: any) => {
      if (response.url) {
        window.location.href = response.url
      }
    }),
    catchError(this.handleError)

    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}
