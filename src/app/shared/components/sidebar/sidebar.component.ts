import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 constructor( private gifservice:GifsService){}

 get tagHistory(){
  return this.gifservice.tagHistory;
 }

 searchTag(tag:string):void{
  this.gifservice.searchTag(tag);
 }
}
