import { TestBed } from '@angular/core/testing';

import { ApiGraphService } from './api-graph.service';

describe('ApiGraphService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ApiGraphService = TestBed.get(ApiGraphService);
        expect(service).toBeTruthy();
    });
});
