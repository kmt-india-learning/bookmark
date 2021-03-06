import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/auth';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }
 
  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true })
      .catch((reason: any) => console.log('user save failed:', reason));
  }

  get(uid:string):Observable<any>{
    return this.db.doc('/users/' + uid).valueChanges();
  }
}