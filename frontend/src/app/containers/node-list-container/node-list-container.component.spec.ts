import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeListContainerComponent } from './node-list-container.component';

describe('NodeListContainerComponent', () => {
  let component: NodeListContainerComponent;
  let fixture: ComponentFixture<NodeListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
