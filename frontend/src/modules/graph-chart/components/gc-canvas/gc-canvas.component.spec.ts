import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcCanvasComponent } from './gc-canvas.component';

describe('GcCanvasComponent', () => {
    let component: GcCanvasComponent;
    let fixture: ComponentFixture<GcCanvasComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GcCanvasComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcCanvasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
