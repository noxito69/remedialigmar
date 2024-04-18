import { TestBed } from '@angular/core/testing';

import { GameIdService } from './game-id.service';

describe('GameIdService', () => {
  let service: GameIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
