import { TestBed } from '@angular/core/testing';

import { BlogsService } from './blogs.service';

describe('MockBlogsService', () => {
  let service: BlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
