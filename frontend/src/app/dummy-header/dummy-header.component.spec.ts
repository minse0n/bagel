import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyHeaderComponent } from './dummy-header.component';

describe('DummyHeaderComponent', () => {
  let component: DummyHeaderComponent;
  let fixture: ComponentFixture<DummyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
