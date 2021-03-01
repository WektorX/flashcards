import { Component, OnInit, Input } from "@angular/core";
import { ConnectService } from "../connect.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  showAdmin: boolean = true;
  showEdit: boolean = false;
  lekcje = [];
  last: number;
  toDel: number;
  toRename: number;
  zawartosc: object[] = [];
  ktora: number;
  constructor(
    //  private router: ActivatedRoute,
    public appServ: ConnectService
  ) {}
  del(e) {
    this.toDel = e;
    document.getElementById("delB").style.display = "block";
    // this.appServ.delLess({ do: "3", which: e });
  }
  delete() {
    var element = this.toDel;
    this.appServ.delLess({ do: "3", which: element });
    this.anuluj();
    this.reload();
  }
  anuluj() {
    document.getElementById("delB").style.display = " none";
  }
  edit(e) {
    console.log("edit " + e);
    this.toRename = parseInt(e);
    document.getElementById("editB").style.display = "block";
  }

  cancleE() {
    document.getElementById("editB").style.display = "none";
    //@ts-ignore
    document.getElementById("nazwaE").value = "";
  }
  saveE() {
    var numer = this.toRename;
    //@ts-ignore
    var nazwa = document.getElementById("nazwaE").value;
    console.log(nazwa + " " + this.toRename);
    this.appServ.delLess({ do: "5", which: numer, name: nazwa });
    this.cancleE();
    this.reload();
  }

  add() {
    console.log("dodaj lekcje");
    document.getElementById("addB").style.display = "block";
  }

  nameYes() {
    document.getElementById("a").style.display = "none";
    document.getElementById("b").style.display = "none";
    document.getElementById("nazwaL").style.display = "inline-block";
    document.getElementById("c").style.display = "inline-block";
  }

  nameNo() {
    this.last += 1;
    var numer = this.last;
    this.appServ.delLess({ do: "4", nr: numer, name: "" });
    document.getElementById("addB").style.display = "none";
    document.getElementById("a").style.display = "inline-block";
    document.getElementById("b").style.display = "inline-block";
    document.getElementById("c").style.display = "none";
    this.reload();
  }
  named() {
    this.last += 1;
    var numer = this.last;

    //@ts-ignore
    var nazwa = document.getElementById("nazwaL").value;
    this.appServ.delLess({ do: "4", nr: numer, name: nazwa });
    document.getElementById("addB").style.display = "none";
    document.getElementById("a").style.display = "inline-block";
    document.getElementById("b").style.display = "inline-block";
    document.getElementById("c").style.display = "none";
    this.reload();
  }

  reload() {
    console.log("reload");
    setTimeout(() => {
      this.appServ.getData({ do: "1" }, this.show);
    }, 20);
  }

  editZaw(e) {
    this.appServ.getData({ do: "2", lekcja: e }, data => {
      for (var j = 0; j < data.length; j++) {
        data[j]["pl"] = data[j]["pl"].replace("<br/>", " ");
        this.zawartosc.push(data[j]);
      }
    });
    this.showAdmin = false;
    this.showEdit = true;
    this.ktora = e;
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
    console.log(numery[numery.length - 1]);
    this.last = parseInt(numery[numery.length - 1].nr);
    console.log(this.last);
    this.lekcje = numery;
  };

  ngOnInit() {
    this.appServ.getData({ do: "1" }, this.show);
  }
}
