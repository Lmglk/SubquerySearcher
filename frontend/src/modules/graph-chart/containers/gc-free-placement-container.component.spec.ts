import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcFreePlacementContainerComponent } from './gc-free-placement-container.component';

describe('GcFreePlacementContainerComponent', () => {
    let component: GcFreePlacementContainerComponent;
    let fixture: ComponentFixture<GcFreePlacementContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GcFreePlacementContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcFreePlacementContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
