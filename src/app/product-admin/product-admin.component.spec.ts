/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductAdminComponent } from './product-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductAdminService } from './product-admin.service';
import { Product } from './product';

const productDetails: Product = {
  "productDescription": "ThinkBridge",
  "productId": 101,
  "productImage": "C:\\fakepath\\Screenshot (21).png",
  "productName": "ThinkBridge",
  "productPrice": 497
}

const event: any = {
  "target": {
    "files": {
      "lastModified": 1625203276474,
      "lastModifiedDate": "Fri Jul 02 2021 10:51:16 GMT+0530 (India Standard Time)",
      "name": "Circuit.PNG",
      "size": 91549,
      "type": "image/png",
      "webkitRelativePath": "",
      "length": 1,
      "0": {
        "lastModified": 1625203276474,
        "lastModifiedDate": "Fri Jul 02 2021 10:51:16 GMT+0530 (India Standard Time)",
        "name": "Circuit.PNG",
        "size": 91549,
        "type": "image/png",
        "webkitRelativePath": "",
        "length": 1
      }
    }
  }
}

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ProductAdminComponent],
      providers: [ProductAdminService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductList() and perform its action', (done) => {
    component.getProductList();
    setTimeout(() => {
      expect(component.productList.length).toBeTruthy(true);
      expect(component.newProductid).toBeDefined();
      done();
    }, 1000);
  });

  it('should call buildProductForm() and perform its action', (done) => {
    component.buildProductForm();
    setTimeout(() => {
      expect(component.newProductid).toBeDefined();
      done();
    }, 1000);
  });

  it('should call onClickOtherAction(edit,101) and perform its action', (done) => {
    component.onClickOtherAction('edit', 101);
    setTimeout(() => {
      expect(component.productForm).toBeTrue();
      done();
    }, 1000);
  });

  it('should call onSubmitForm() one and perform its action', (done) => {
    component.productList.push(productDetails);
    component.onSubmitForm();
    setTimeout(() => {
      expect(component.submitted).toBeFalse();
      done();
    }, 1000);
  });

  it('should call closeForm() one and perform its action', (done) => {
    component.closeForm();
    setTimeout(() => {
      expect(component.productForm).toBeFalse();
      done();
    }, 1000);
  });

  it('should call onClickOtherAction(delete) and perform its action', (done) => {
    component.onClickOtherAction('delete', 101);
    setTimeout(() => {
      expect(component.deleteProductId).toEqual(101);
      done();
    }, 1000);
  });

  it('should call onSubmitForm() two and perform its action', (done) => {
    component.productList.push(productDetails);
    component.productInputName = 'ThinkBridge';
    component.productFormGroup.patchValue({
      productId: 101,
      productName: 'ThinkBridge',
      productDescription: 'ThinkBridge',
      productImage: 'C:\\fakepath\\Screenshot (21).png',
      productPrice: 497
    });
    component.editProductId = 101;
    component.onSubmitForm();
    setTimeout(() => {
      expect(component.submitted).toBeTrue();
      done();
    }, 1000);
  });

  it('should call closeForm() two and perform its action', (done) => {
    component.closeForm();
    setTimeout(() => {
      expect(component.productForm).toBeFalse();
      done();
    }, 1000);
  });

  it('should call deleteProduct(101) and perform its action', (done) => {
    component.productList.push(productDetails);
    component.deleteProduct(101);
    setTimeout(() => {
      expect(component.productList.length).toEqual(1);
      done();
    }, 1000);
  });

  it('should call onResetForm() and perform its action', (done) => {
    component.onResetForm();
    setTimeout(() => {
      expect(component.uploadedImage).toEqual('');
      done();
    }, 1000);
  });

  it('should call setValueToForm() and perform its action', (done) => {
    component.productList.push(productDetails);
    component.setValueToForm(101);
    setTimeout(() => {
      expect(component.productInputName).toBeDefined();
      done();
    }, 1000);
  });

  it('should call onFileChange() and perform its action', (done) => {
    component.onFileChange(event);
    setTimeout(() => {
      expect(component.uploadedImage).toBeDefined();
      done();
    }, 1000);
  });

});
