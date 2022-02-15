import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() wordTextToShow: string[] = [""];
  @Input() wordSecretWord: string[] = [""];
  @Input() wordShowSecretWord: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}
