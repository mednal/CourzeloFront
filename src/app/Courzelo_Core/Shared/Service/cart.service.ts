import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../Modules/Entity/cart';
import { Course } from '../../Modules/Entity/course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiServerUrl ='http://localhost:8088';
  //private apiServerUrl ='https://springgateway.herokuapp.com/cart-herokuu';

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) { 
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  public getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart/all`);
  }

  public addCart(id: number, idCourse: string): Observable<Cart | null> {
    return this.http.post<Cart>(`${this.apiServerUrl}/cart/add/${id}/${idCourse}`, httpOptions);
  }

  public updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiServerUrl}/cart/update`, cart);
  }

  public deleteCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cart/delete/${cartId}`);
  }

  public getUserCart(id: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart/findCart/${id}`);
  }

  public deleteCartsByUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cart/deleteCarts/${userId}`);
  }

  /**
   * Creates a charge from a Stripe.js token
   * @param cardToken Token provided by Stripe.js
   * @param price The price of the item(s) you are selling
   * @param currency The currency
   * @param description A description of the item(s)
   */
   public createCharge(cardToken: any, price: any, currency: any, description: any) {
    const chargeRequest = {
      token: cardToken.id,
      price,
      description,
      currency
    };
    return this.http.post(`${this.apiServerUrl}/charges`, chargeRequest, { headers: this.headers });
  }

  private stripejsUrl = 'https://js.stripe.com/v3/';

  /**
  * Initializes the stripe api by loading it into the DOM
  */
 public initializeStripe() {
   return new Observable((observer) => {
     const script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = this.stripejsUrl;
     script.onload = () => {
       observer.next();
       observer.complete();
     };
     document.getElementsByTagName('head')[0].appendChild(script);
   });
 }
}
