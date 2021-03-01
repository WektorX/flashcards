import { Component, NgModule } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RouterModule, Routes, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private router: Router) {}
  title = "English speak course";
}
