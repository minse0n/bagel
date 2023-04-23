import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BagelCard } from '../models/bagelCard';
import { CardService } from './card.service';

@Injectable({ providedIn: 'root' })
export class PostcategoryFilterService {

  private cardsUrl = 'http://localhost:8080/cards/list';
  
  constructor(
    private _http: HttpClient,
    private _cardservice: CardService,  
  ) { }

  getAllData(): Observable<BagelCard[]> {
   return this._http.get<BagelCard[]>(this.cardsUrl);
  }
  
  findByCategory(postCategory: string): Observable<BagelCard[]> {
    return this.getAllData().pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
  
  findBySearchCategory(searchText: string, postCategory: string): Observable<BagelCard[]> {
    return this._cardservice.searchCard(searchText).pipe(map((items: any[]) => 
      items.filter((item: { category: string; }) => 
        item.category === postCategory)))
  }
}
