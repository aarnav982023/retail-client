import { Injectable } from "@angular/core";
import { Subject, throwError, BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient) {}

  checkAuth = () => {
    return this.http
      .get("http://localhost:8300/checkSession", {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          console.log("hello");
          console.log(response);
        })
      );
  };

  login = (provider: string) => {
    let authPopInterval;
    const authPop = window.open(
      `http://localhost:8300/oauth2/authorization/${provider}?redirect_uri="http://localhost:3000/"`,
      "Retail Login",
      "toolbar=no, menubar=no, width=600, height=700, top=100, location=0"
    );
    authPopInterval = setInterval(() => {
      try {
        if (authPop.closed) clearInterval(authPopInterval);
        if (authPop.location.href === "http://localhost:3000/") {
          console.log("closed");
          authPop.parent.close();
          clearInterval(authPopInterval);
          this.checkAuth();
        }
      } catch (e) {
        //console.log(e);
      }
    }, 50);
  };

  private handleError = (error: HttpErrorResponse) => {
    this.loggedIn.next(false);
    return throwError(error.message);
  };
}
