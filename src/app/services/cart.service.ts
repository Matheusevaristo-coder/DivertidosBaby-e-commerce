import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsArray: CartItem[] = [];
  private totalPrice: WritableSignal<number> = signal<number>(0);
  getTotalPrice: Signal<number>;

  constructor() {
    this.getTotalPrice = this.totalPrice.asReadonly();

    
    this.cartItemsArray = JSON.parse(localStorage.getItem("cartItemsArray") || "[]");

    
    if (this.cartItemsArray.length == 0) localStorage.setItem("cartItemsArray", "[]");


    this.totalPrice.update(() => this.calculateTotalPrice());
  }

  calculateTotalPrice() {
    return this.cartItemsArray.reduce((prevValue, currValue) => {
      return prevValue + currValue.product.price * currValue.quantity;
    }, 0);
  }

  getItemById(id: number) {
    const foundIndex: number = this.cartItemsArray.findIndex((item) => {
      return item.product.id === id;
    });

    return foundIndex;
  }

  
  getCartArray() {
    return this.cartItemsArray;
  }


  addItem(item: CartItem) {
    if (item.quantity >= item.product.availableInStock) {
      console.log("Foi adicionado o máximo disponível em estoque!");
      return;
    }

    item.quantity++;
    this.totalPrice.update((previousValue: number) => {
      return previousValue + item.product.price;
    });

    localStorage.setItem("cartItemsArray", JSON.stringify(this.cartItemsArray));
  }

  removeItem(item: CartItem) {
    if (item.quantity <= 1) {
      const index = this.getItemById(item.product.id);
      this.cartItemsArray.splice(index, 1);
    }

    item.quantity--;
    this.totalPrice.update((previousValue: number) => {
      const currValue = previousValue - item.product.price;
      return Math.max(currValue, 0);
    });

    localStorage.setItem("cartItemsArray", JSON.stringify(this.cartItemsArray));
  }

  
  addItemToCart(produto: Produto) {
    const index = this.getItemById(produto.id);

    if (index == -1) {
      this.cartItemsArray.push({
        product: produto,
        quantity: 1
      });

      this.totalPrice.update((previousValue: number) => {
        return previousValue + produto.price;
      });

      localStorage.setItem("cartItemsArray", JSON.stringify(this.cartItemsArray));
    } else {
      this.addItem(this.cartItemsArray[index]);
    }
  }
}
