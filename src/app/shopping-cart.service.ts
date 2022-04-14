import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCartsCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) { 
    this.shoppingCartsCollection = this.db.collection<any>('shopping-carts');
  }

  private create(){
    return this.shoppingCartsCollection.add({
      dateCreated: new Date().getTime()
    });
  }

  async getCartItems(){
    let cartId=await this.getOrCreateCart();
    return this.db.doc('/shopping-carts/' + cartId).collection("items").valueChanges();
  }

  private async getOrCreateCart():Promise<string>{
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result=await this.create();
    localStorage.setItem('cartId',result.id);
    return result.id;
  }

  private getItem(cartId:string,productId:string){
    return this.db.doc('/shopping-carts/' + cartId+'/items/'+productId)
  }

  addToCart(product:Product){
    this.updateCartItem(product,1);
  }

  removeFromCart(product:Product){
    this.updateCartItem(product,-1);
  }

  private async updateCartItem(product:Product,change:number){
    let cartId= await this.getOrCreateCart();
    let item$:any = this.getItem(cartId,product.customID).valueChanges();
    item$.pipe(take(1)).subscribe((item:any)=>{
      this.db.doc('/shopping-carts/' + cartId+'/items/'+product.customID).set({product:product,quantity:(item?.quantity || 0)+ change});
    })
  }
}
