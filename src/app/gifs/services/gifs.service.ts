import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList:Gif[] = [];
  private _tagHistory:string[] = [];
  private apiKey:string = '0xn6gHfYi7GzAWMm4HW5MrQiVomM7VPl';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient) {
    this.loadLocalStorage();
    if (this._tagHistory.length > 0){
      this.searchTag(this._tagHistory[0]);
    }
   }

  get tagHistory():string[]{
    return [...this._tagHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.slice(0,10);
    this.saveLocalStorage();
  }

  private loadLocalStorage():void{
    if (localStorage.getItem('history')){
      this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    }
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }
  searchTag(tag:string):void{
    if (tag.length===0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl }/search`, { params })
    .subscribe(resp => {
      this.gifList = resp.data;

    });

  }
}
