import { Component, ConstructorSansProvider, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { BagelCard } from 'src/app/models/bagelCard';
import { COURSES } from 'src/app/models/courses';

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
  newCard: BagelCard = {
    title: '', 
    text: '',
    category: '',
    username: '',
    term: '', 
    course: ''
  };
  courses = COURSES;
  

  constructor(
    private router: Router,
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
    selectedValue.value==='InAachen' ? this.isEnabled = true : this.isEnabled = false;
  }
  cardRegister() {
    const data = {
      title: this.newCard.title, 
      text: this.newCard.text,
      category: this.newCard.category,
      username: this.newCard.username,
      term: this.newCard.term,
      course: this.newCard.course
    }
    this._cardservice.create(data).subscribe({
      next: (res) => {
        alert('new Post saved successfully.');
        this.router.navigate(['']);
      },
      error: (e) => console.error(e)
    });
  }
}
