import { Component, OnInit, Input } from "@angular/core";
import { ConnectService } from "../connect.service";
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  @Input("zawartosc") zawartosc: object[];
  @Input("ktora") ktora: number;
  polskie: string;
  constructor(public appServ: ConnectService) {}

  del(e) {
    this.appServ.slowko({ do: "6", pl: e });
    var that = this;
    setTimeout(function() {
      that.reload();
    }, 20);
  }
  editZaw(pl, en) {
    this.polskie = pl;
    document.getElementById("editS").style.display = "block";
    //@ts-ignore
    document.getElementById("slowoPol").value = pl;
    //@ts-ignore
    document.getElementById("slowoEng").value = en;
  }
  reload() {
    this.zawartosc = [];
    this.appServ.getData({ do: "2", lekcja: this.ktora }, data => {
      for (var j = 0; j < data.length; j++) {
        data[j]["pl"] = data[j]["pl"].replace("<br/>", " ");
        this.zawartosc.push(data[j]);
      }
    });
  }
  add() {
    document.getElementById("addS").style.display = "block";
  }

  saveSS = async () => {
    //@ts-ignore
    var pl = document.getElementById("slowoPol").value;
    //@ts-ignore
    var en = document.getElementById("slowoEng").value;
    await this.appServ.slowko({ do: "6", pl: this.polskie });
    var that = this;

    await this.appServ.slowko({ do: "7", pl: pl, en: en, nr: this.ktora });

    this.cancleSS();

    setTimeout(function() {
      that.reload();
    }, 10);
  };

  saveS() {
    //@ts-ignore
    var pl = document.getElementById("slowoP").value;
    //@ts-ignore
    var en = document.getElementById("slowoE").value;
    this.appServ.slowko({ do: "7", pl: pl, en: en, nr: this.ktora });
    this.cancleS();
    var that = this;
    setTimeout(function() {
      that.reload();
    }, 10);
  }
  cancleSS() {
    document.getElementById("editS").style.display = "none";
    //@ts-ignore
    document.getElementById("slowoPol").value = "";
    //@ts-ignore
    document.getElementById("slowoEng").value = "";
    this.polskie = "";
  }

  cancleS() {
    document.getElementById("addS").style.display = "none";
    //@ts-ignore
    document.getElementById("slowoP").value = "";
    //@ts-ignore
    document.getElementById("slowoE").value = "";
  }

  ngOnInit() {
    console.log(this.ktora);
  }
}
