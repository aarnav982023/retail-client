import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.scss"],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  login = (provider: string) => {
    this.auth.login(provider, this.dialogRef);
  };
}
