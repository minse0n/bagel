import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dummy-header',
  templateUrl: './dummy-header.component.html',
  styleUrls: ['./dummy-header.component.scss']
})
export class DummyHeaderComponent {

  @Output() SideNavToggle = new EventEmitter();

  clicktest() {
    console.log("되었다!!!");
  }
  openSidenav() {
    this.SideNavToggle.emit();
  }
}
