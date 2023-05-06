import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from '../../../services/card.service';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
    
  bagel: BagelCard = {};
  isMy: boolean = true;
  
  private cardIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCardID());

  setCardID(cardID: string) {
    this.cardIDSubject.next(cardID);
  }
  getCardID() {
    return '';
  }
  cardID(): Observable<string> {
    return this.cardIDSubject.asObservable();
  }

  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _getCardService:CardService,
  ) { }

  ngOnInit(): void {
    this.getBagel(this.route.snapshot.params['cardId']);
  }
  
  gotoCards() {
    this.router.navigate(['/home']);
  }
  getBagel(_id: string): void {
    this._getCardService.get(_id)
      .subscribe({
        next: (data) => {
          this.bagel = data;
          console.log(data);

          console.log(this.bagel._id);
          this.setCardID(this.bagel._id);
        },
        error: (e) => console.error(e)
      });
  }
  bagelUpdate() {
    const navigationExtras: NavigationExtras = {
      state: {
        currentBagel: this.bagel
      }
    };
    this.router.navigate(['/register'], navigationExtras);
  }
  bagelDelete() {
    this.toastr.warning('please here click', 'If you really want to delete it,')
      .onTap
      .pipe(take(1))
      .subscribe(() => this.trueDelete()
    );
  }
  trueDelete() {
    this._getCardService.delete(this.bagel._id).subscribe({
        next: (res) => {
          this.toastr.success('', 'Post has been deleted.');
          this.router.navigate(['']);
        },
        error: (e) => console.error(e)
      });  
  }
}
