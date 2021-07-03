import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from './product';
import { ProductAdminService } from './product-admin.service';

/**
 * Const to store type of action 
 */
const ADD_PRODUCT = 'add';
const DELETE_PRODUCT = 'delete';
const EDIT_PRODUCT = 'edit';

@Component({
    selector: 'app-product-admin',
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
    public productFormGroup: FormGroup; // variable to store form group
    public productList: Array<Product> = []; // Array to store product list
    public submitted: boolean = false; // Flag to indigate form submit
    public productFormWrapper: boolean = false; // Flag to indigate form div
    public productForm: boolean = false; // Flag to indigate product form
    public editEnable: boolean = false; // Flag to indigate form edit
    public deleteProductId: number = 0; // Variable to store product id to delete
    public editProductId: number = 0; // Variable to store product id to edit
    public newProductid: number = 0; // Variable to store product id
    public uploadedImage: string = ''; // Variable to disply uploaded product image
    public productInputName: string = ''; // Variable to store product name to edit
    public productInputDescription: string = ''; // Variable to store product description to edit
    public productInputPrice: number = 0; // Variable to store product price to edit
    public errorMsg: string = '';

    constructor(
        private fb: FormBuilder,
        private sanitizer: DomSanitizer,
        private productService: ProductAdminService,
        private cdr: ChangeDetectorRef
    ) { }

    /**
     * Component initialization life-cyle method
     */
    ngOnInit() {
        // Get product details
        this.getProductList();
        // Build product form
        this.buildProductForm();
    }

    /**
     * Get product details form API
     */
    public getProductList(): void {
        this.productService.getProductList().subscribe((data) => {
            this.newProductid = data.productId;
            this.productList.push(data);
        }, (error) => {
            /* To do error handling */
            this.errorMsg =
                error.status === 401 || error.status === 404
                    ? error.description
                    : 'Unable to fetch product list!';
        }
        );
    }

    /**
     * Build product form
     */
    public buildProductForm(): void {
        this.productFormGroup = this.fb.group({
            productId: [''],
            productName: ['', Validators.required],
            productDescription: [
                '',
                [Validators.required, Validators.maxLength(200)],
            ],
            productImage: [''],
            productPrice: ['', Validators.required],
        });
    }

    /**
     * Submit the product form
     */
    public onSubmitForm(): void {
        this.submitted = true;
        if (this.productInputName && this.productList.length) {
            this.productList.forEach((product) => {
                if (product.productId == this.editProductId) {
                    product.productName = this.productFormGroup.value.productName ? this.productFormGroup.value.productName : this.productInputName;
                    product.productPrice = this.productFormGroup.value.productPrice ? this.productFormGroup.value.productPrice : this.productInputPrice;
                    product.productDescription = this.productFormGroup.value.productDescription ? this.productFormGroup.value.productDescription : this.productInputDescription;
                    if (this.productFormGroup.value.productImage) {
                        product.productImage = this.productFormGroup.value.productImage;
                    }
                    this.productInputName = '';
                    this.productInputPrice = 0;
                    this.productInputDescription = ''
                }
            });
        } else {
            this.productFormGroup.patchValue({
                productId: this.newProductid ? ++this.newProductid : 1
            });
            this.productList.push(this.productFormGroup.value);
            this.onResetForm();
        }
        this.productFormWrapper = false;
        this.productForm = false;
        this.editEnable = false;
    }

    /**
     * Reset product details form
     */
    public onResetForm(): void {
        this.submitted = false;
        this.productFormGroup.reset();
        this.uploadedImage = '';
    }

    /**
     * Edit, Add, Delete action logics
     * @param {action}
     * @param {id}
     */
    public onClickOtherAction(action: string, id?: number): void {
        if (action === ADD_PRODUCT || action === EDIT_PRODUCT) {
            this.productFormWrapper = true;
            this.productForm = true;
            this.deleteProductId = 0;
            if (id) {
                this.editProductId = id;
                this.setValueToForm(id);
            }
        } else if (action === DELETE_PRODUCT) {
            this.productForm = false;
            this.productFormWrapper = true;
            this.deleteProductId = id ? id : 0;
        }
        if (action === EDIT_PRODUCT) {
            this.editEnable = true;
        }
    }

    /**
     * Set product details to the form for edit
     * @param {id}
     */
    public setValueToForm(id: number): void {
        this.cdr.detectChanges();
        this.productList.forEach((product) => {
            if (product.productId === id) {
                this.productInputName = product.productName;
                this.productInputPrice = product.productPrice;
                this.productInputDescription = product.productDescription;
            }
        });
    }

    /**
     * Upload product image
     * @param {event}
     */
    public onFileChange(event: any): void {
        let sd = event;
        const reader = new FileReader();
        console.log('22222', event.target.files, event.target.files.length,sd);
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.uploadedImage = reader.result as string;
                this.productFormGroup.patchValue({
                    productImage: this.sanitizer.bypassSecurityTrustUrl(
                        reader.result as string
                    ),
                });
            };
        }
    }

    /**
     * delete product image
     * @param {deleteProductId}
     */
    public deleteProduct(deleteProductId: number): void {
        this.productList.forEach((product, index) => {
            if (product.productId === deleteProductId) {
                this.productList.splice(index, 1);
            }
        });
        this.productFormWrapper = false;
        this.productForm = false;
        this.deleteProductId = 0;
    }

    /**
     * Close product form
     */
    public closeForm(): void {
        this.productFormWrapper = false;
        this.productForm = false;
        this.deleteProductId = 0;
    }
}
