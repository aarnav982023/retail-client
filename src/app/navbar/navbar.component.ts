import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: "300px",
      panelClass: "app-navbar-login-panel",
      autoFocus: false,
    });
  }
}
