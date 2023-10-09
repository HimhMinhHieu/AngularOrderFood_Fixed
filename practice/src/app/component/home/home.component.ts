import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import { increment } from 'src/app/Reducer/MyCartCounterReducer/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public foods:any = [];
  count:number = 1;
  private cart: any = {};
  constructor(private apis: ApiService,
     private cookie: CookieService, 
     private store:Store<{counter: {counter: number}}>,
     private cartService: MyCartService
     ){
    
   }
 
  ngOnInit(): void {
    this.apis.get(endpoints.foods).subscribe((data) => {
      this.foods = data
    })
    console.log(JSON.parse(this.cookie.get('cart')))
  }

  addCart(product: any)
  {
    this.store.dispatch(increment({ payload: this.count }));
    this.cartService.addToCart(product);
  }
}
