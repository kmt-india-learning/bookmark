import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,private userService:UserService) { 
    this.user$=this.afAuth.authState;
  }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.AuthLogin(new firebase.GoogleAuthProvider());
  }
  
  AuthLogin(provider: any) {
    return this.afAuth.
    signInWithPopup(provider)
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<any> {
    return this.user$.pipe(
      switchMap((user:any)=>{
        if (user) return this.userService.get(user.uid)
        return of(null);
      })
    );
  }
}
