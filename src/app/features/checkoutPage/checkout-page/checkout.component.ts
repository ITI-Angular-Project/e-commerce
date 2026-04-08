import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']

})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  selectedDeliveryMethod: string = 'standard';
  selectedPaymentMethod: string = 'credit-card';
  Math = Math;

  // Order Summary Data
  orderItems = [
    {
      id: 1,
      name: 'Pro Wireless X10',
      subtitle: 'Silver, AM83',
      quantity: 1,
      price: 299.00,
      image: '/images/pro-wireless-x10.jpg'
    },
    {
      id: 2,
      name: 'Elite Pods Pro',
      subtitle: 'White, H115',
      quantity: 1,
      price: 199.00,
      image: '/images/elite-pods-pro.jpg'
    }
  ];

  orderSummary = {
    subtotal: 498.00,
    shipping: 0,
    discount: -49.80,
    total: 448.20
  };

  deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      duration: '4-7 Business Days',
      cost: 'FREE',
      isPremium: false
    },
    {
      id: 'express',
      name: 'Express Delivery',
      duration: '1-2 Business Days',
      cost: '$9.99',
      isPremium: false
    }
  ];

  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.initializeForm();
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
      cvv: ['', Validators.required]
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
      // Here you would typically call a service to submit the order
      // this.orderService.placeOrder(this.checkoutForm.value).subscribe(...);
    } else {
      console.log('Form is invalid');
    }
  }

  getCountries(): string[] {
    return ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy'];
  }

  getStatesList(): string[] {
    return ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware'];
  }
}
