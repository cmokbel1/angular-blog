import { TestBed } from '@angular/core/testing';

import { BlogMessageService } from './blog-message-service.service';

describe('BlogMessageService', () => {
  let service: BlogMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
