import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  shoppingCartItemCount:number;
  appUser:AppUser
  constructor(private auth:AuthService,private router:Router,private cartService:ShoppingCartService) {
    
   }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser);
    let cart$=await this.cartService.getCartItems();
    cart$.subscribe((cartItems:any)=>{
      this.shoppingCartItemCount=0;
      for (let productId in cartItems)
        this.shoppingCartItemCount+=cartItems[productId].quantity;
    });
  }
  logout(){
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
