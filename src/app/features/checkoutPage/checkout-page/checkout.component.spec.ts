/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, ReactiveFormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required controls', () => {
    expect(component.checkoutForm.get('email')).toBeTruthy();
    expect(component.checkoutForm.get('phone')).toBeTruthy();
    expect(component.checkoutForm.get('fullName')).toBeTruthy();
    expect(component.checkoutForm.get('addressLine1')).toBeTruthy();
    expect(component.checkoutForm.get('cardholderName')).toBeTruthy();
    expect(component.checkoutForm.get('cardNumber')).toBeTruthy();
    expect(component.checkoutForm.get('expiryDate')).toBeTruthy();
    expect(component.checkoutForm.get('cvv')).toBeTruthy();
  });

  it('should select delivery method', () => {
    component.selectDeliveryMethod('express');
    expect(component.selectedDeliveryMethod).toBe('express');
    expect(component.checkoutForm.get('deliveryMethod')?.value).toBe('express');
  });

  it('should select payment method', () => {
    component.selectPaymentMethod('paypal');
    expect(component.selectedPaymentMethod).toBe('paypal');
    expect(component.checkoutForm.get('paymentMethod')?.value).toBe('paypal');
  });

  it('should have order items', () => {
    expect(component.orderItems.length).toBe(2);
    expect(component.orderItems[0].name).toBe('Pro Wireless X10');
    expect(component.orderItems[1].name).toBe('Elite Pods Pro');
  });

  it('should have correct order summary totals', () => {
    expect(component.orderSummary.subtotal).toBe(498.0);
    expect(component.orderSummary.discount).toBe(-49.8);
    expect(component.orderSummary.total).toBe(448.2);
  });

  it('should submit form when valid', () => {
    component.checkoutForm.patchValue({
      email: 'test@example.com',
      phone: '+1 (555) 000-0000',
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'San Francisco',
      stateProvince: 'California',
      zipPostalCode: '94025',
      country: 'us',
      cardholderName: 'John Doe',
      cardNumber: '1234 5678 9012 3456',
      expiryDate: '12/25',
      cvv: '123'
    });

    spyOn(console, 'log');
    component.placeOrder();

    expect(console.log).toHaveBeenCalledWith('Form Data:', jasmine.any(Object));
  });

  it('should log error when form is invalid', () => {
    spyOn(console, 'log');
    component.placeOrder();

    expect(console.log).toHaveBeenCalledWith('Form is invalid');
  });

  it('should derive countries list', () => {
    const countries = component.getCountries();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries).toContain('United States');
  });
});
