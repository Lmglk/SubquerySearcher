import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcSequencePlacementContainerComponent } from './gc-sequence-placement-container.component';

describe('GcSequencePlacementContainerComponent', () => {
  let component: GcSequencePlacementContainerComponent;
  let fixture: ComponentFixture<GcSequencePlacementContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcSequencePlacementContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcSequencePlacementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
