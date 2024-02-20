import { TestBed } from '@angular/core/testing';

import { MockBlogsService } from './mock-blogs.service';

describe('MockBlogsService', () => {
  let service: MockBlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
