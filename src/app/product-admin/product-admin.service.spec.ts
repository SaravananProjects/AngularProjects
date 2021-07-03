/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { Product } from './product';
import { ProductAdminService } from './product-admin.service';

describe('Service: ProductAdmin', () => {
  let httpMock: HttpTestingController;
  let service: ProductAdminService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductAdminService]
    });
    service = TestBed.get(ProductAdminService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should product admin service', inject([ProductAdminService], (service: ProductAdminService) => {
    expect(service).toBeTruthy();
  }));

  // it('should get getProductList() and permance it action',
  // inject([HttpTestingController, ProductAdminService], () => {
  //   service.getProductList.subscribe((response: Product) => {
  //     expect(response).toBeTrue();
  //   });
  // }));
});
