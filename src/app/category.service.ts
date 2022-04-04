import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Item { id: string; name: string; }

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  
  constructor(private db: AngularFirestore) { }

  getCategories(){
    this.categoryCollection = this.db.collection<Item>('categories');
    return this.categoryCollection.valueChanges({ idField: 'customID' });
  }
}
