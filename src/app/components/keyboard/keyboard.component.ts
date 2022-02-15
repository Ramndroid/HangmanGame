import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Input() keyboardDifficulty: number = 0;
  @Output() keyboardPressedLetter = new EventEmitter<string>();

  keyboardAlphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  constructor() { }

  keyboardPressKey(letter: string, event: Event) {
    this.keyboardPressedLetter.emit(letter);
    if (this.keyboardDifficulty < 2) {
      (<HTMLElement>event.target).style.visibility = "hidden";
    }
  }

  ngOnInit(): void { }

}
