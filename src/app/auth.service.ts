import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { MatDialogRef } from "@angular/material/dialog";
import { LoginDialogComponent } from "./navbar/login-dialog/login-dialog.component";
import { User } from "./shared/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = new BehaviorSubject<Boolean>(false);
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  checkAuth = () => {
    return this.http
      .get("http://localhost:8300/checkSession", {
        withCredentials: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.loggedIn.next(true);
          this.user.next(response as User);
        })
      );
  };

  login = (provider: string, dialogRef: MatDialogRef<LoginDialogComponent>) => {
    let authPopInterval;
    const authPop = window.open(
      `http://localhost:8300/oauth2/authorization/${provider}?redirect_uri="http://localhost:4200/"`,
      "Retail Login",
      "toolbar=no, menubar=no, width=600, height=700, top=100, location=0"
    );
    authPopInterval = setInterval(() => {
      try {
        if (authPop.closed) clearInterval(authPopInterval);
        if (authPop.location.href === "http://localhost:4200/") {
          console.log("closed");
          authPop.parent.close();
          clearInterval(authPopInterval);
          this.checkAuth().subscribe((response) => {
            dialogRef.close();
          });
        }
      } catch (e) {
        //console.log(e);
      }
    }, 50);
  };

  private handleError = (error: HttpErrorResponse) => {
    this.loggedIn.next(false);
    this.user.next(null);
    return throwError(error.message);
  };
}
