import { Injectable } from '@angular/core';
import { Product } from '../products/product-list/products';
import { BehaviorSubject } from 'rxjs';

export type CartItem = { quantity: number } & Product;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartItem[]>([]);

  readonly cart$ = this.cartSubject.asObservable();

  addProduct(product: Product, quantity: number): void {
    const cartValue = this.cartSubject.getValue();
    const isProductInCart = cartValue.find((cartItem) => cartItem.id === product.id);

    if (!isProductInCart) {
      this.cartSubject.next([
        ...cartValue,
        {
          ...product,
          quantity
        },
      ]);
    } else {
      this.changeQuantity(isProductInCart.id, isProductInCart.quantity + quantity);
    }
  }

  changeQuantity(productId: Product['id'], quantity: number): void {
    if (quantity) {
      this.cartSubject.next(
        this.cartSubject
          .getValue()
          .map((product) =>
            product.id === productId ? { ...product, quantity } : product
          )
      );
    } else {
      this.deleteProduct(productId);
    }
  }

  deleteProduct(productId: Product['id']): void {
    this.cartSubject.next(
      this.cartSubject.getValue().filter((product) => product.id !== productId)
    );
  }

  clear(): void {
    this.cartSubject.next([]);
  }
}
