import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  cartIems: any;
  category: string;

  constructor(private route: ActivatedRoute, private productsService: ProductService, private cartService: ShoppingCartService) {
    this.productsService.getProducts()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
  }
  async ngOnInit() {
    this.subscription = (await this.cartService.getCartItems()).subscribe(cart => {
      this.cartIems = cart;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
