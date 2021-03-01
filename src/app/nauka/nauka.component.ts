import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-nauka',
  templateUrl: './nauka.component.html',
  styleUrls: ['./nauka.component.css']
})
export class NaukaComponent implements OnInit {

  polskie: string;
  angielskie: string;
  ktore: number;
  isPolskie: boolean = true;
  isAng: boolean = false;
  isEnd: boolean = false;
  isOk: boolean = true;
  pozostalo: number;

  @Input("slowka") slowka: object[];
  constructor() {
    var that = this
    setTimeout(function () {
      that.slowko()
    }, 10)


  }


  klik() {

    const numbers = interval(1500);

    const takeFourNumbers = numbers.pipe(take(1));

    takeFourNumbers.subscribe(x => this.slowko());

    this.isAng = true;
    this.isPolskie = false;

    var u = new SpeechSynthesisUtterance();
    u.text = this.angielskie

    u.lang = 'en-US';
    u.rate = 1.2;
    speechSynthesis.speak(u);


  }
  slowko() {


    var temp = this.slowka
    this.pozostalo = temp.length
    if (temp.length > 0) {
      this.isAng = false;
      this.isPolskie = true;
      this.ktore = Math.floor(Math.random() * temp.length)
      this.polskie = temp[this.ktore]["pl"]
      this.polskie = this.polskie.replace("<br/>" , " ")
      this.angielskie = temp[this.ktore]["en"]
      temp.splice(this.ktore, 1)
      this.slowka = temp
    }
    else {
      this.isEnd = true;
      this.isOk = false;
    }


  }

  ngOnInit() {





  }

}
