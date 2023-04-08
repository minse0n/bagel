import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { BagelCard } from '../../../models/bagelCard';
import { CardService } from '../../../services/card.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
    
  bagel: BagelCard = {};
  isMy: boolean = true;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _getCardService:CardService,
  ) { }

  ngOnInit(): void {
    this.getBagel(this.route.snapshot.params['cardId']);
  }
  getBagel(_id: string): void {
    this._getCardService.get(_id)
      .subscribe({
        next: (data) => {
          this.bagel = data;
          console.log(data);
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
    alert('Do you want to delete it?');
    this._getCardService.delete(this.bagel._id).subscribe({
      next: (data) => {
        alert('Post has been deleted.');
        this.router.navigate(['']);
      },
      error: (e) => console.error(e)
    });
  }
}
