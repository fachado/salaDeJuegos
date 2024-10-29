import { TestBed } from '@angular/core/testing';

import { FlagQuizService } from './flag-quiz.service';

describe('FlagQuizService', () => {
  let service: FlagQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
