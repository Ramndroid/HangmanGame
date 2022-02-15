import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  @Input() drawAttemptsLeft: number = 0;

  constructor() { }

  ngOnInit(): void { }

}
