import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  products:Product[]=[];
  filteredProducts:Product[]=[];
  
  category:string;
  constructor(private route:ActivatedRoute,private productsService:ProductService) { 
    this.productsService.getProducts()
      .pipe(
      switchMap(products=>{
        this.products=products;
        return this.route.queryParamMap;
      }))
        .subscribe(params=>{
          this.category=params.get('category');
          this.filteredProducts=(this.category)?this.products.filter(p=>p.category===this.category):this.products;
        });
  }
}
