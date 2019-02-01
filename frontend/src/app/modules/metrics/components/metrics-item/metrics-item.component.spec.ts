import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsItemComponent } from './metrics-item.component';

describe('MetricsItemComponent', () => {
    let component: MetricsItemComponent;
    let fixture: ComponentFixture<MetricsItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MetricsItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricsItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
