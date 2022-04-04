import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService, Item } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

  categories$:Observable<any>;
  product={
    title:'',
    price:0,
    category:'',
    imageUrl:'',
    customID:''
  }
  id:any;
  constructor(
    private route:ActivatedRoute,
    private router:Router, 
    private categoryService:CategoryService,
    private productService:ProductService) {
    this.categories$=this.categoryService.getCategories();
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).pipe(take(1)).subscribe(product=>this.product=product);
   }

  save(product:any){
    if(this.id) this.productService.updateProduct(this.id,product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
  delete(){
    if(!confirm('Are you sure you want to delete this product ?')) return;
    this.productService.deleteProduct(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
