import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount:number;
  cart$:any;
  cartItemsArray:any[]=[];
  constructor(private cartService:ShoppingCartService) { }

  async ngOnInit() {
    this.cart$=await this.cartService.getCartItems();
    this.cart$.subscribe((cartItems:any)=>{
      this.shoppingCartItemCount=0;
      this.cartItemsArray=cartItems;
      for (let productId in this.cartItemsArray)
        this.shoppingCartItemCount+=this.cartItemsArray[productId].quantity;
    });
  }

  get totalPrice(){
    let sum=0;
    for (let productId in this.cartItemsArray){
      sum+=this.cartItemsArray[productId].product.price * this.cartItemsArray[productId].quantity;
    }
    return sum;
  }
}
