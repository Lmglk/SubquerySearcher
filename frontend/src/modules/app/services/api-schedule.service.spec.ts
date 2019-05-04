import { TestBed } from '@angular/core/testing';

import { ApiScheduleService } from './api-schedule.service';

describe('ApiScheduleService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ApiScheduleService = TestBed.get(ApiScheduleService);
        expect(service).toBeTruthy();
    });
});
