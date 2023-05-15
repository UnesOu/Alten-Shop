import { Component, OnInit } from '@angular/core';
import { Product } from 'app/shared/utils/interfaces/product';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { ProductServiceService } from '../product-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { log } from 'console';

@Component({
    selector: 'app-products-admin',
    templateUrl: './products-admin.component.html',
    styleUrls: ['./products-admin.component.scss'],
    providers: [MessageService, ConfirmationService],

})
export class ProductsAdminComponent implements OnInit {


    submitted: boolean;
    products: Product[];
    totalRecords: number;
    statuses: any[];
    selectAllElement: boolean = false;
    selectedProducts: Product[];
    productDialog: boolean;
    loading: boolean = true;
    product: Product;
    Delete: string = 'Delete';
    activityValues: number[] = [0, 100];

    constructor(private productService: ProductServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.productService.getProductList().then((data: any) => (this.products = data));
        this.loading = true;
    }

    loadProducts(event: LazyLoadEvent) {
        this.loading = true;

        setTimeout(() => {
            this.productService.getProductList({ lazyEvent: JSON.stringify(event) }).then((res: any) => {
                this.products = res;
                this.totalRecords = res.totalRecords;
                this.loading = false;
            });
        }, 1000);
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Vous êtes sur de supprimer les produits selectionés ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Les Products sont bien supprimés', life: 3000 });
            }
        });
    }
    // OPEN THE POP UP ADD
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }


    onSelectionChange(value = []) {
        this.selectAllElement = value.length === this.totalRecords;
        this.selectedProducts = value;
    }

    onSelectAllChange(event) {
        const checked = event.checked;
        if (checked) {
            this.productService.getProductList().then((res: any) => {
                this.selectedProducts = res;
                this.selectAllElement = true;
            });
        } else {
            this.selectedProducts = [];
            this.selectAllElement = false;
        }
    }
    //EDIT PRODUCT
    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }
    // DELETE PRODUCT
    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Vous êtes sur de faire la suppression du ' + product.name + '?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Supprimer', life: 3000 });
            }
        });
    }
    // DIDE DIALOG
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    // ADD NEW PRODUCT OR MODIFITY IT
    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le product a été modifié !', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Le product a été crée !', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }
    // FIND PRODUCT BY ID
    findIndexById(id: any): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): any {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
