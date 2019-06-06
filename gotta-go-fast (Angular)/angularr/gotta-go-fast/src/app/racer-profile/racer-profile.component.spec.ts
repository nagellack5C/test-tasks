import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacerProfileComponent } from './racer-profile.component';

describe('RacerProfileComponent', () => {
  let component: RacerProfileComponent;
  let fixture: ComponentFixture<RacerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
