import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './avatar-modal.service';

@Component({
  selector: 'app-avatar-modal',
  templateUrl: './avatar-modal.component.html',
  styleUrls: ['./avatar-modal.component.scss']
})
export class AvatarModalComponent implements OnInit, OnDestroy {
  @Input() modalId!: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
      this.element = el.nativeElement;
  }

  ngOnInit(): void {
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    // document.body.appendChild(this.element);

    // close modal on background click
//     this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
//         if (el.target.className === 'avatar-modal') {
//             this.close();
//         }
//     });

//     // add self (this modal instance) to the modal service so it's accessible from controllers
//     this.modalService.add(this);
//   }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.modalId);
      this.element.remove();
  }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('avatar-modal-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('avatar-modal-open');
  }
}