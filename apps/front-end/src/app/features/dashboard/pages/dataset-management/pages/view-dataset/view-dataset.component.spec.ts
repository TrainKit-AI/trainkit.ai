import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatasetComponent } from './view-dataset.component';

describe('ViewExampleComponent', () => {
  let component: ViewDatasetComponent;
  let fixture: ComponentFixture<ViewDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDatasetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
