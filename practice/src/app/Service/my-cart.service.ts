import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {
  private carts: any = {};
  private cartsSubject = new BehaviorSubject<any>({});
  
  constructor(private cookie: CookieService) { }

  getCart(): any {
    return this.carts;
  }

  addToCart(product: any) {
    if (product.id in this.carts) {
      this.carts[product.id].quantity += 1;
    } else {
      this.carts[product.id] = {
        id: product.id,
        name: product.name,
        quantity: 1,
        unitPrice: product.price
      };
    }
    this.cookie.set('cart', JSON.stringify(this.carts));
    this.cartsSubject.next(this.carts);
  }

  updateItem(item: any) {
    this.carts[item.id].quantity = item.quantity;

    this.cartsSubject.next(this.carts);
  }

  deleteItem(item: any) {
    delete this.carts[item.id];

    this.cartsSubject.next(this.carts);
  }

  getCartSubject(): Observable<any> {
    return this.cartsSubject.asObservable();
  }
}
