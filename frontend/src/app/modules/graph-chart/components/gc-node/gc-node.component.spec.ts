import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcNodeComponent } from './gc-node.component';

describe('GcNodeComponent', () => {
    let component: GcNodeComponent;
    let fixture: ComponentFixture<GcNodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GcNodeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
