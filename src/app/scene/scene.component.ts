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

  sceneWordDisplayedNow: string = "";

  sceneWordDisplayedNowArray: string[] = [];

  sceneSuccessfulLetters: string[] = [];

  sceneSecretWord: string = "";

  sceneSecretWordArray: string[] = [];

  sceneShowSecretWord: boolean = false;

  sceneTextButton: string = "Abandonar partida"; 

  constructor() { }

  ngOnInit(): void {
    // Establecer intentos según dificultad
    /*switch (this.sceneDifficulty) {
      case 0:
        this.sceneAttempts = 14;
        break;
      case 1:
        this.sceneAttempts = 14;
        break;
      case 2:
        this.sceneAttempts = 14;
        break;
    }*/

    // Obtener una palabra aleatoria según nivel de dificultad
    let random = Math.floor(Math.random() * (words[this.sceneDifficulty].length));
    this.sceneSecretWord = words[this.sceneDifficulty][random].toUpperCase();

    // Primer pintado de la palabra (toda con '_')
    for (let i = 0; i < this.sceneSecretWord.length; i++) {
      this.sceneWordDisplayedNow += "_";
      this.sceneSecretWordArray.push(this.sceneSecretWord[i]);
      console.log(this.sceneSecretWordArray);
    }

    this.sceneWordDisplayedNowArray = [];
      for (let i = 0; i < this.sceneWordDisplayedNow.length; i++){
        this.sceneWordDisplayedNowArray.push("_");
      }

  }

  scenePressKey(letra: string) {
    // si la palabra incluye la letra
    if (this.sceneSecretWord.includes(letra)) {

      // se almacena la letra que sí está en la palabra
      this.sceneSuccessfulLetters.push(letra);

      // variable usada para repintar la palabra
      let result: string = "";

      // recorrer la palabra...
      for (let i = 0; i < this.sceneSecretWord.length; i++) {
        let letraPalabra = this.sceneSecretWord[i];
        if (this.sceneSuccessfulLetters.includes(letraPalabra)) {
          // si coincide la letra, se pinta la letra
          result += letraPalabra;
        } else {
          // si no coincide la letra, se pinta '_'
          result += "_";
        }
      }
      this.sceneWordDisplayedNow = result;
      this.sceneWordDisplayedNowArray = [];
      for (let i = 0; i < this.sceneWordDisplayedNow.length; i++){
        if (this.sceneWordDisplayedNow[i] != "_") {
          this.sceneWordDisplayedNowArray.push(this.sceneWordDisplayedNow[i]);
        } else {
          this.sceneWordDisplayedNowArray.push("_");
        }
        
      }
    } else {
      this.sceneAttempts--;
    }

    // Comprobar si el jugador ha ganado
    if (!this.sceneWordDisplayedNow.includes("_")) {
      this.sceneTextButton = "Nueva partida";
      this.sceneCurrentState = 1;
    }

    // Comprobar si el jugador ha perdido
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
