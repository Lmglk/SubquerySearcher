import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRowHeaderComponent } from './schedule-row-header.component';

describe('ScheduleRowHeaderComponent', () => {
    let component: ScheduleRowHeaderComponent;
    let fixture: ComponentFixture<ScheduleRowHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleRowHeaderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleRowHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
