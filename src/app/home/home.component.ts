import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeIsStartGame: boolean = false;
  homeDifficulty: number = 0;

  homeSetDifficulty(difficulty: number) {
    this.homeDifficulty = difficulty;
    this.homeIsStartGame = true;
  }

  homeStartNewGame() {
    this.homeIsStartGame = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
