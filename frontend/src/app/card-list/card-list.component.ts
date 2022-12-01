import { Component, OnInit } from '@angular/core';
import { BAGELS } from '../models/mock-bagelCard';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  bagels = BAGELS;
  
  constructor() { }

  ngOnInit(): void {
  }

}
