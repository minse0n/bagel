import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from '../../../services/card.service';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  bagel: BagelCard = {};
  isMy: boolean = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _getCardService:CardService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getBagel(this.route.snapshot.params['cardId']);

    
  }

  async isMyCard() {
    const cardUsername = await this.bagel.username;
    const username = await this.authService.getUsername();
    // console.log('카드의 유저네임',cardUsername, '현재 유저네임',username, '일치?',cardUsername === username);
    return this.isMy = (cardUsername === username);
  }
  
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

  gotoCards() {
    this.router.navigate(['/home']);
  }
  getBagel(_id: string): void {
    this._getCardService.get(_id)
      .subscribe({
        next: (data) => {
          this.bagel = data;

          this.isMyCard();
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
