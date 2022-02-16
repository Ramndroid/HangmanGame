import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { words } from './words';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  @Input() sceneDifficulty: number = 0;
  @Output() sceneStateGame = new EventEmitter<boolean>();

  sceneCurrentState: number = 0; 

  sceneAttempts: number = 14; 

  sceneWordDisplayedNowArray: string[] = []; 

  sceneSecretWordArray: string[] = []; 

  sceneShowSecretWord: boolean = false; 

  sceneTextButton: string = "Abandonar partida"; 

  private sceneSuccessfulLetters: string[] = [];

  private SEPARATOR: string = " ";

  constructor() { }

  ngOnInit(): void {
    this.setAttemptsByDifficulty();
    this.getSecretWord();
    this.displaySecretWord();
  }

  private setAttemptsByDifficulty() {
    switch (this.sceneDifficulty) {
      case 0:
        this.sceneAttempts = 14;
        break;
      case 1:
        this.sceneAttempts = 12;
        break;
      case 2:
        this.sceneAttempts = 9;
        break;
    }
  }

  private getSecretWord() {
    let random = Math.floor(Math.random() * (words[this.sceneDifficulty].length));
    let sceneSecretWord = words[this.sceneDifficulty][random].toUpperCase();
    this.getSecretWordInArray(sceneSecretWord);
  }

  private getSecretWordInArray(secretWord: string) {
    for (let i = 0; i < secretWord.length; i++) {
      this.sceneSecretWordArray.push(secretWord[i]);
    }
  }

  private displaySecretWord() {
    this.sceneWordDisplayedNowArray = [];
    for (let i = 0; i < this.sceneSecretWordArray.length; i++) {
      this.sceneWordDisplayedNowArray.push(this.SEPARATOR);
    }
  }

  scenePressKey(letter: string) {
    this.checkTheLetter(letter);
    this.hasWon();
    this.hasLost();
  }

  private checkTheLetter(letter: string) {
    if (this.isLetterInSecretWord(letter))
      this.secretWordHasLetter(letter);
    else
      this.sceneAttempts--;
  }

  private isLetterInSecretWord(letter: string): boolean {
    return this.sceneSecretWordArray.includes(letter);
  }

  private secretWordHasLetter(letter: string) {

    this.sceneSuccessfulLetters.push(letter);

    let result: string = "";

    this.sceneSecretWordArray.forEach(letter => {
      if (this.sceneSuccessfulLetters.includes(letter))
        result += letter;
      else
        result += this.SEPARATOR;
    });

    this.sceneWordDisplayedNowArray = [...result];
  }

  private hasWon() {
    if (!this.sceneWordDisplayedNowArray.includes(this.SEPARATOR)) {
      this.sceneTextButton = "Nueva partida";
      this.sceneCurrentState = 1;
    }
  }

  private hasLost() {
    if (this.sceneAttempts == 0) {
      this.sceneTextButton = "Volver a intentar";
      this.sceneShowSecretWord = true;
      this.sceneCurrentState = 2;
    }
  }

  sceneTryAgain() {
    this.sceneStateGame.emit(false);
  }

}
