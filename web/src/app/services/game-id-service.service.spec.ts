import { TestBed } from '@angular/core/testing';

import { GameIdServiceService } from './game-id-service.service';

describe('GameIdServiceService', () => {
  let service: GameIdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameIdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
