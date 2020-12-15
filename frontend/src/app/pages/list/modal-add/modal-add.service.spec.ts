import { TestBed } from '@angular/core/testing';

import { ModalAddService } from './modal-add.service';

describe('ModalAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalAddService = TestBed.get(ModalAddService);
    expect(service).toBeTruthy();
  });
});
