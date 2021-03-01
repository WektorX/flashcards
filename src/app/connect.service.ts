import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConnectService {
  dane = [];
  constructor(private httpClient: HttpClient) {
    let a = "1";
  }

  getData(a, cb) {
    this.httpClient
      .get("http://localhost/vocab/server.php", { params: a })
      .subscribe(
        data => {
          //@ts-ignore
          this.dane = Object.values(data);
          return cb(this.dane);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  delLess(a) {
    this.httpClient
      .get("http://localhost/vocab/server.php", { params: a })
      .subscribe(
        data => {
          console.log("usunięto lekcje");

          return true;
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  slowko(a) {
    this.httpClient
      .get("http://localhost/vocab/server.php", { params: a })
      .subscribe(
        data => {
          console.log("usunięto lekcje");

          return true;
        },
        error => {
          console.log("Error", error);
        }
      );
  }
}
