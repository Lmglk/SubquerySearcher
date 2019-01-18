import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticContainerComponent } from './statistic-container.component';

describe('StatisticContainerComponent', () => {
    let component: StatisticContainerComponent;
    let fixture: ComponentFixture<StatisticContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatisticContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatisticContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
