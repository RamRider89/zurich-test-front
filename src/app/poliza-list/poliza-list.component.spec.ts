import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaListComponent } from './poliza-list.component';

describe('PolizaListComponent', () => {
  let component: PolizaListComponent;
  let fixture: ComponentFixture<PolizaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolizaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolizaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
