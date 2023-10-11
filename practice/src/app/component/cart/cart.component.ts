import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { decrement } from 'src/app/Reducer/MyCartCounterReducer/counter.actions';
import { MyCartService } from 'src/app/Service/my-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() c!:any
  carts!: any;
  constructor(private cartService: MyCartService,
     private router: Router,
     private cookie: CookieService,
     private store:Store<{counter: {counter: number}}>
     ) { }
  carts$!: Observable<any>;

  Object = Object;
  ngOnInit(): void {
    if(this.cookie.check('cart') === true){
      this.carts = JSON.parse(this.cookie.get('cart'))
    }
  }

  deleteItem(item: any)
  {
    this.store.dispatch(decrement({ payload: item.quantity }))
    if(item.id in this.carts)
    {
        delete this.carts[item.id];
        this.cookie.set('cart', JSON.stringify(this.carts));

        return this.carts;
    }
  }
}
