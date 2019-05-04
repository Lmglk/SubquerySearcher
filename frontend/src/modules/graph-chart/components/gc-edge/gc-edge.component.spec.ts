import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcEdgeComponent } from './gc-edge.component';

describe('GcEdgeComponent', () => {
    let component: GcEdgeComponent;
    let fixture: ComponentFixture<GcEdgeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GcEdgeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcEdgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
