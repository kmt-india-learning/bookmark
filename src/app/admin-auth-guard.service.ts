import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService,private router:Router) { }
  
  canActivate(){
    return this.auth.appUser$
     .pipe(map(user=>{
       if(user && user.isAdmin) return true;
       this.router.navigate(['/not-authorized']);
       return false;
     }));
   }
}
