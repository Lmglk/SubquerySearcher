import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGroupComponent } from './schedule-group.component';

describe('ScheduleGroupComponent', () => {
    let component: ScheduleGroupComponent;
    let fixture: ComponentFixture<ScheduleGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleGroupComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
