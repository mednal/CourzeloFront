import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CartService } from '../../Shared/Service/cart.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { Cart } from '../Entity/cart';
import { User } from '../Entity/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class CartComponent implements OnInit {
  carts: Cart[] | any;
  deleteCart: Cart | any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  stripePromise = loadStripe(environment.stripe);
  currentUser: User | any;
  totalprice = 0;
  
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private cartService: CartService, private tokenService: TokenStorageService) { }

  panelOpenState = false;
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.getCarts();
    this.totalprice;

    this.cartService.initializeStripe().subscribe(() => {
      this.stripe = this.stripe("pk_test_51JYK8XLuKN48LccAhfUDj0vM9EjVCU3S4QBu2n1LOH6vEa7g3aKLNUzyABBixNvhJ8xXpjHKxsCdEhXIGWaLiHUG004bVv0EQb");
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
      this.card.addEventListener('change',
        (        event: { error: { message: any; }; }) => event.error ? this.cardError = event.error.message : null);
    });
  }

  async pay(): Promise<void> {
    // here we create a payment object
    this.currentUser= this.tokenService.getUser();
    const payment = {
      name: this.currentUser.displayName,
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: this.totalprice * 100,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cart',
      successUrl: 'http://localhost:4200/paymentsuccess',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    //.post(`https://springgateway.herokuapp.com/cart-herokuu/api/payment`, payment)
    this.http.post(`http://localhost:8088/api/payment`, payment).subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }

  public getCarts(): void {
    this.currentUser = this.tokenService.getUser();
    this.cartService.getUserCart(this.currentUser.id).subscribe(
      (response: Cart[]) => {
        this.totalprice = 0;
        for (let cart of response){
                   this.totalprice = this.totalprice + cart.course.price;
              }
        this.carts = response;
        console.log(this.carts);
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'You have to login to display your cart',
          icon: 'error',
          confirmButtonText: 'Return'
        })
        //alert(error.message);
      }
    );
  }

  public onDeleteCart(cartId: number): void {
    this.cartService.deleteCart(cartId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCarts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private stripe: any = null;
  private card: any = null;
  private elements: any = null;
  public cardError: any = null;
  public chargeError: any = null;
  public charge: any = null;


  /**
   * Submits the Stripe token to the backend and creates a charge
   * @param token The Stripe.js token
   */
  public createCharge(token : any) {
    this.charge = null;
    this.chargeError = null;
    this.cartService.createCharge(token, 999, 'usd', 'This is a sample charge')
    .subscribe(
      response => this.charge = response,
      error => this.chargeError = error
    );
  }

  /**
   * Gets a Stripe token from the Stripe.js API
   */
  public getToken() {
    this.stripe.createToken(this.card).then((result: { error: { message: any; }; token: any; }) => {
      if (result.error) {
        this.cardError = result.error.message;
      } else {
        this.createCharge(result.token);
      }
    });
  }

}
