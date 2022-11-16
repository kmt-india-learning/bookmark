import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart-items") shoppingCartItems: any;
  appUser: AppUser
  shoppingCartItemCount: number;
  cart$: any;
  cartItemsArray: any[] = [];
  faMinus = faMinus;
  faPlus = faPlus;
  constructor(private auth: AuthService, private cartService: ShoppingCartService, private _location: Location) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCartItems();
    this.cart$.subscribe((cartItems: any) => {
      this.shoppingCartItemCount = 0;
      for (let productId in this.cartItemsArray)
        this.shoppingCartItemCount += this.cartItemsArray[productId].quantity;
      for (let productId in cartItems) {
        if (cartItems[productId].quantity > 0) {
          this.cartItemsArray.push(cartItems[productId]);
        }
      }

    }
    );
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.cartItemsArray) {
      sum += this.cartItemsArray[productId].product.price * this.cartItemsArray[productId].quantity;
    }
    return sum;
  }

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

  backClicked() {
    this._location.back();
  }

}
