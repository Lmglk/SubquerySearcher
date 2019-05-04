import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcContainerComponent } from './gc-container.component';

describe('GcContainerComponent', () => {
    let component: GcContainerComponent;
    let fixture: ComponentFixture<GcContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GcContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
