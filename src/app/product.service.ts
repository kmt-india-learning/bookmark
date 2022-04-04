import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) { 
    this.productsCollection = this.db.collection<any>('products');
  }

  create(product:any){
    return this.productsCollection.add(product);
  }
  getProducts(){
    return this.productsCollection.valueChanges({ idField: 'customID' });
  }
  getProduct(uid:string):Observable<any>{
    return this.db.doc('/products/' + uid).valueChanges();
  }
  updateProduct(uid:string,product:any){
    return this.db.doc('/products/' + uid).update(product);
  }
  deleteProduct(uid:string){
    return this.db.doc('/products/' + uid).delete();
  }

}
