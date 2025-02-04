import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMfeComponent } from './home.component';

describe('HomeMfeComponent', () => {
  let component: HomeMfeComponent;
  let fixture: ComponentFixture<HomeMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMfeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
