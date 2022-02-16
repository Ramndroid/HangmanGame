import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Input() keyboardDifficulty: number = 0;
  @Output() keyboardPressedLetter = new EventEmitter<string>();

  keyboardAlphabet: string[] = [];

  constructor() { }

  keyboardPressKey(letter: string, event: Event) {
    this.keyboardPressedLetter.emit(letter);
    if (this.keyboardDifficulty < 2) {
      (<HTMLElement>event.target).style.visibility = "hidden";
    }
  }

  ngOnInit(): void {
    switch (this.keyboardDifficulty) {
      case 0:
        this.keyboardAlphabet = ['a', 'e', 'i', 'o', 'u', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
        break;
      case 1:
        this.keyboardAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        break;
      case 2:
        this.keyboardAlphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
        break;
    }
  }

}
