import { Component, Input, OnInit } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart-items") shoppingCartItems: any;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCartItems) return 0;

    let itemArr = this.shoppingCartItems.filter((p: any) => p.product.customID === this.product.customID)
    if (itemArr.length > 0) return itemArr[0].quantity;
    else return 0;
  }
}
