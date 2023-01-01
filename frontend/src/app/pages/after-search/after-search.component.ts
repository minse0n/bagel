import { Component } from '@angular/core';

@Component({
  selector: 'app-after-search',
  templateUrl: './after-search.component.html',
  styleUrls: ['./after-search.component.scss']
})
export class AfterSearchComponent {
  
  hasResult: boolean = true;
  inputtedText: string;
  searched: boolean;
  
  searchText(text: string) {
    this.inputtedText = text;
    this.hasResult = true;
    this.searched = true;
  }
}
