import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { BagelCard } from 'src/app/models/bagelCard';
import { COURSES } from 'src/app/models/courses';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isMy: boolean = true;
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
  }; 
  courses = COURSES;
  bagelCard: BagelCard = {
    _id: '',
    title: '', 
    text: '',
    category: '',
    username: '',
    term: '',
    course: ''
  };
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cardservice: CardService,
    ) {
  }
  ngOnInit(): void {
    const state = window.history.state;
    this.bagelCard = state && (state.currentBagel || state.newBagel) || this.bagelCard;
    // 위의 코드에서는 window.history.state에 값이 있을 경우, currentBagel 또는 newBagel 속성 중 하나의 값을 bagelCard에 할당합니다. 만약 window.history.state가 undefined인 경우, this.bagelCard의 초기값을 사용합니다.
    console.log(this.bagelCard);
  }
  
  selectCategory() {
    let categorySelect = (document.getElementById('selectCategory')) as HTMLSelectElement;
    let selected = categorySelect.selectedIndex;
    let selectedValue = categorySelect.options[selected].value;
    this.isEnabled = selectedValue === 'InAachen' || selectedValue === 'AfterRWTH';
  }
  bagelSave() {
    let bagel = {
      _id: this.bagelCard._id,
      title: this.bagelCard.title, 
      text: this.bagelCard.text.replace(/<\/?p>/g, ''),
      category: this.bagelCard.category,
      username: this.bagelCard.username,
      term: this.bagelCard.term,
      course: this.bagelCard.course
    }
    if(!this.isMy) {
    this._cardservice.create(bagel).subscribe({
      next: (res) => {
        alert('new Post saved successfully.');
        this.router.navigate(['']);
      },
      error: (e) => console.error(e)
    });
    } else {
      this._cardservice.update(bagel._id, bagel).subscribe({
        next: (data) => {
          bagel = data;
          alert('new Post saved successfully.');
          this.router.navigate(['']);
        },
        error: (e) => console.error(e)
      });
    }
  }
  bagelDelete() {
    this._cardservice.delete(this.bagelCard._id).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (e) => console.error(e)
    });
  }
}
