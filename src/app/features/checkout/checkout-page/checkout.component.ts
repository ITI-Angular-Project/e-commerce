import { Component, computed, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartService = inject(CartService);
  authService = inject(AuthService);
  Math = Math;
  orderSummary: any;
  router = inject(Router);
  selectedDeliveryMethod: string = 'standard';
  selectedPaymentMethod: string = 'credit-card';

  public subTotal = computed(() =>
    this.cartService.Cart().reduce((sum, item) => sum + item.price * item.amount, 0),
  );
  deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      duration: '4-7 Business Days',
      cost: 'FREE',
      isPremium: false,
    },
    {
      id: 'express',
      name: 'Express Delivery',
      duration: '1-2 Business Days',
      cost: '$9.99',
      isPremium: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
  ) {
    this.orderSummary = this.router.currentNavigation()?.extras.state?.['orderSummary'];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.cartService.getCart().subscribe();
  }

  initializeForm(): void {
    this.checkoutForm = this.fb.group({
      // Contact Information
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],

      // Shipping Address
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      stateProvince: ['', Validators.required],
      zipPostalCode: ['', Validators.required],
      country: ['', Validators.required],

      // Delivery Method
      deliveryMethod: ['standard', Validators.required],

      // Payment Details
      paymentMethod: ['credit-card', Validators.required],
      cardholderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  selectDeliveryMethod(methodId: string): void {
    this.selectedDeliveryMethod = methodId;
    this.checkoutForm.get('deliveryMethod')?.setValue(methodId);
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
    this.checkoutForm.get('paymentMethod')?.setValue(method);
  }

  placeOrder(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Data:', this.checkoutForm.value);

      const payload = {
        orderNumber: `#TS-${Math.floor(100000 + Math.random() * 900000)}`,
        datePlaced: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        totalAmount: this.orderSummary.total,
        userId: this.authService.currentUser?.id,
        status: 'Processing',
        items: this.cartService.Cart().map((item) => ({
          name: item.title,
          quantity: item.amount,
          price: item.price,
          imageUrl: item.imageSrc,
        })),
      };

      this.orderService.placeOrder(payload).subscribe({
        next: (response) => {
          console.log('Order created successfully!', response);
          this.cartService.deleteAllCart(this.authService.currentUser?.id).subscribe();
          this.router.navigate(['/orders'], {
            replaceUrl: true,
          }); // Redirect to orders history
        },
        error: (err) => {
          console.error('Failed to create order', err);
        },
      });
    } else {
      this.checkoutForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  getCountries(): string[] {
    return [
      'United States',
      'Canada',
      'Mexico',
      'United Kingdom',
      'Germany',
      'France',
      'Spain',
      'Italy',
    ];
  }

  getStatesList(): string[] {
    return [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
    ];
  }
}
