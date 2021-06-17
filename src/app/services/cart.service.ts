import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(element => element.id == theCartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (existingCartItem != undefined) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(element => {
      totalPriceValue += element.unitPrice * element.quantity;
      totalQuantityValue += element.quantity;
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(tempCartItem: CartItem) {
    tempCartItem.quantity--;
    if (tempCartItem.quantity == 0)
      this.remove(tempCartItem);
    else
      this.computeCartTotals();
  }

  remove(tempCartItem: CartItem) {
    const indexItem: number = this.cartItems.findIndex(element => element.id == tempCartItem.id);

    if (indexItem > -1) {
      this.cartItems.splice(indexItem, 1);
      this.computeCartTotals();
    }
  }
}
