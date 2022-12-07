import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "./auth.component/User.model";

export interface AuthResponseData {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
    registered?:boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthService{

user = new BehaviorSubject<User>(null);
// token = new Subject<User>();
    private TokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}
    
    SignUp(email:String, password:string){
       return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(
            catchError( this.handleError ),
            tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn );    
        }));
    }

    Login(email:string, password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe(catchError( this.handleError ),
        tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn );
                 
        }));
    }

    autologin(){
        const userData: {
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return;
        }   
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationdate = new Date(userData._tokenExpirationDate).getTime() -
            new Date().getDate();
            this.autoLogout(expirationdate);
        }    
    }

    Logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        // localStorage.clear(); //it will Clear whole LocalStorage data.
        if(this.TokenExpirationTimer){
            clearTimeout(this.TokenExpirationTimer);
        }
        this.TokenExpirationTimer = null;

    }

    autoLogout(expirationduration:number){
        console.log(expirationduration);
      this.TokenExpirationTimer = setTimeout(() => {
        this.Logout();
      }, expirationduration);
    }

    private handleAuthentication(
        email:string,
        userid:string,
        token:string, 
        expiresIn:number
        ){
        const expirationdate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userid, token, expirationdate);
        this.user.next(user);    
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user)); 
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage = 'An Unknown error occured'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
           case 'EMAIL_EXISTS':
            errorMessage = 'this email is already exist!'
           break;
           case 'EMAIL_NOT_FOUND':
            errorMessage = 'this email does not exist'
           break;
           case 'INVALID_PASSWORD':
            errorMessage = 'this password is not correct'
           break;
          }
          return throwError(errorMessage);
    }   
}

