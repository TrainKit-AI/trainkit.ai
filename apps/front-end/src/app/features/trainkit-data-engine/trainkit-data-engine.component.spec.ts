import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainkitDataEngineComponent } from './trainkit-data-engine.component';

describe('TrainkitDataEngineComponent', () => {
  let component: TrainkitDataEngineComponent;
  let fixture: ComponentFixture<TrainkitDataEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainkitDataEngineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainkitDataEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
