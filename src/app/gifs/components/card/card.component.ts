import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif es requerido');
  }
@Input()
  public gif!:Gif;
}
