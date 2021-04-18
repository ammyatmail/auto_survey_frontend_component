import { TestBed } from '@angular/core/testing';

import { SurveyserviceService } from './surveyservice.service';

describe('SurveyserviceService', () => {
  let service: SurveyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
