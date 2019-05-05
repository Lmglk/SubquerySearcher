import { TestBed } from '@angular/core/testing';

import { GraphChartService } from './graph-chart.service';

describe('GraphChartService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GraphChartService = TestBed.get(GraphChartService);
        expect(service).toBeTruthy();
    });
});
