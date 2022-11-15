import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightToBracket, faBookBookmark, faBookmark, faCartShopping, faMoon, faSun, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  shoppingCartItemCount: number;
  appUser: AppUser
  faArrowRightToBracket = faArrowRightToBracket;
  faCartShopping = faCartShopping;
  faBookBookmark = faBookBookmark;
  faUserCircle = faUserCircle;
  faMoon = faMoon;
  faSun = faSun;
  isOpen: boolean = false;
  showUserMenu: boolean = false;
  isDarkTheme: boolean = false
  constructor(private auth: AuthService, private router: Router, private cartService: ShoppingCartService) { }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.cartService.getCartItems();
    cart$.subscribe((cartItems: any) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cartItems)
        this.shoppingCartItemCount += cartItems[productId].quantity;
    });
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'dark') {
        document.documentElement.classList.add('dark');
        this.isDarkTheme = true;
        console.log("Its all Dark here");

      } else {
        document.documentElement.classList.remove('dark');
        this.isDarkTheme = false;
        console.log("Its all bright here");
      }
    }

  }

  showUserDetail = () => {
    this.showUserMenu = !this.showUserMenu;
  }
  showMobileMenu() {
    this.isOpen = !this.isOpen;
  }
  themeToggle() {
    // var themeToggleBtn = document.getElementById('theme-toggle');
    // var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    // var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // var themeToggleBtn = document.getElementById('theme-toggle');
    // // toggle icons inside button
    // themeToggleDarkIcon.classList.toggle('hidden');
    // themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        this.isDarkTheme = true;
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        this.isDarkTheme = false;
        localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        this.isDarkTheme = false;
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        this.isDarkTheme = true;
        localStorage.setItem('color-theme', 'dark');
      }
    }

  };


  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
