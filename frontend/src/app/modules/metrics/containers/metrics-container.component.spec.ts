import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsContainerComponent } from './metrics-container.component';

describe('MetricsContainerComponent', () => {
    let component: MetricsContainerComponent;
    let fixture: ComponentFixture<MetricsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MetricsContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
