import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { BagelCard } from 'src/app/models/bagelCard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isEnabled: boolean = false;
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      ],
    },
  }
  title: string;
  text: string;
  category: string;
  username: string;
  term: string;
  course: string;
  
  newCard: BagelCard = {
    title: '', 
    text: '',
    category: '',
    username: '',
    term: '', 
    course: ''
  }; 

  constructor(
    private route: ActivatedRoute,
    private _cardservice: CardService,
    ) {
  }
  addBindingCreated(quill: { keyboard: { addBinding: (arg0: { key: string; shiftKey?: boolean; }, arg1: { (range: any, context: any): void; (range: any, context: any): void; }) => void; }; }) {
    quill.keyboard.addBinding({
      key: 'b'
    }, (range: any, context: any) => {
      console.log('KEYBINDING B', range, context)
    })
    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    }, (range: any, context: any) => {
      console.log('KEYBINDING SHIFT + B', range, context)
    })
  }

  ngOnInit(): void {
  }
  
  selectCategory() {
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected];
    selectedValue.value==='community' ? this.isEnabled = true : this.isEnabled = false;
  }
  onFormSubmit() {
    this._cardservice.create(this.newCard).subscribe({
      next: (res) => {
        alert('new Post saved successfully.');
      }
    })
  }
}
