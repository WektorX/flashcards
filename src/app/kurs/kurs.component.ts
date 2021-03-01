import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ConnectService } from "../connect.service";

@Component({
  selector: "app-kurs",
  templateUrl: "./kurs.component.html",
  styleUrls: ["./kurs.component.css"]
})
export class KursComponent implements OnInit {
  showZadania = false;
  showKurs = true;
  zadania = [];
  numer: string;
  wybrane = [];
  toogle = [false, false, false, false];
  zaznacz = true;
  odznacz = false;
  slowka = [];
  showNauka = false;

  public lekcje = [];

  constructor(
    //  private router: ActivatedRoute,
    public appServ: ConnectService
  ) {}

  Click = e => {
    this.toogle[e - 1] = !this.toogle[e - 1];
    var czy: boolean = false;
    var ktory;
    for (var i = 0; i < this.wybrane.length; i++) {
      if (e == this.wybrane[i]) {
        czy = true;
        ktory = i;
      }
    }
    if (czy == false) {
      this.wybrane.push(e);
    } else {
      this.wybrane.splice(ktory, 1);
    }
    console.log(this.wybrane);
  };

  Start = async () => {
    this.slowka = [];
    console.log("wystartowano");
    if (this.wybrane.length <= 0) {
      alert("Nie zaznaczono zadnej lekcji!!");
    } else {
      for (var i = 0; i < this.wybrane.length; i++) {
        await this.appServ.getData(
          { do: "2", lekcja: this.wybrane[i] },
          data => {
            for (var j = 0; j < data.length; j++) {
              this.slowka.push(data[j]);
            }
          }
        );
      }
      await console.log(this.slowka);
      this.showKurs = false;
      this.showNauka = true;
    }
  };
  Zaznacz() {
    this.zaznacz = !this.zaznacz;
    this.odznacz = !this.odznacz;
    this.wybrane = [];
    for (var i = 0; i < this.toogle.length; i++) {
      this.toogle[i] = true;
      this.wybrane.push(i + 1);
    }
    console.log("zaznaczono wszystkie");
    console.table(this.wybrane);
  }

  Odznacz() {
    this.zaznacz = !this.zaznacz;
    this.odznacz = !this.odznacz;
    for (var i = 0; i < this.toogle.length; i++) {
      this.toogle[i] = false;
    }
    this.wybrane = [];
    console.log("odznaczono wszystkie");
  }

  show = a => {
    //@ts-ignore
    this.lekcje = Object.values(a[0]);
    this.lekcje = this.lekcje[0];
    console.log(this.lekcje["@attributes"]);
    var numery = [];
    for (let i = 0; i < this.lekcje.length; i++) {
      numery.push(this.lekcje[i]["@attributes"]);
    }
    function compare(a, b) {
      if (a.nr < b.nr) return -1;
      if (a.nr > b.nr) return 1;
      return 0;
    }
    numery.sort(compare);
    console.log(numery);
    this.lekcje = numery;
  };

  ngOnInit() {
    this.appServ.getData({ do: "1" }, this.show);
  }
}
