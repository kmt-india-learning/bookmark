import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  products:Product[];
  filteredProducts:Product[];
  subscription:Subscription;

  constructor(private productsService:ProductService) { 
    this.subscription= productsService.getProducts().subscribe(products=>this.products=this.filteredProducts=products);
  }

  filter(query:string){
    this.filteredProducts=query?this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
