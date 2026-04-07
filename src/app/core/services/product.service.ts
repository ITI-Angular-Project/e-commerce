import { Injectable, signal } from '@angular/core';
import { Product } from '../Models/Cart/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Signal that holds all products
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Pro Wireless X10',
      category: 'Headphones',
      price: 299,
      originalPrice: 349,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      description: 'Premium wireless headphones with active noise cancellation and 40-hour battery life. Space Grey with leather finish.',
      rating: 4.8,
      reviews: 142,
      badge: 'Sale'
    },
    {
      id: 2,
      name: 'Elite Pods Pro',
      category: 'Earbuds',
      price: 199,
      originalPrice: 249,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqJFOmNxHmwQgfeR4i7cMISDZ4Q8uR_77-_e1q5Zgc_qrh2aBQymeGhVEjo1SXfrBoV89HI6S30hfFIh5oAIGQhcTE_hl1obSwFne6BzUQyDRC-lvgt3NfPiVXKqwEwlLqNwlrZI5bvaBdhsRXPvvzM4dZA7zAMHrT3eqXR_HPeAi0KNTHOTtkeZbeb1spZxGau9LjJ26FU9B924md0dOySsddjJx9aNT1sU8aR2Aq6yQlWVyX-pQ_ZjlhHxIlXfeiE6oU47L2dJSm',
      description: 'True wireless earbuds with MagSafe charging case. Crystal clear sound with spatial audio support.',
      rating: 4.6,
      reviews: 89,
      badge: 'Sale'
    },
    {
      id: 3,
      name: 'SoundBox Portable',
      category: 'Speakers',
      price: 149,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmBodwUBzHvdyNZSxOB-eNq4NnDsK5jdmjZV9Okhy4u8vXjUn-L2ekMCuDWfq4KVqO225jNr0GaUpf8qLvmcKaw4e2HinYop6faxo-8jThKcu7bY0ZtC9Tpt5-g2X6F0AEZV4Hg8gcCzOe-dnn4sZjET0e970LDoVjnlQq0l0HWY9jtZoExOMDBcQbNJgHvr5q-NkrlmTwOvCKpfRTLdMDxJ__KGVZT7SvD8yRqfak9A9pb_xrbZcwjQY5QBMhoBTnXdgTx-ES8Y9t',
      description: 'IP67 waterproof portable speaker with 360° sound and 24-hour playback. Perfect for outdoors.',
      rating: 4.5,
      reviews: 63,
      badge: 'New'
    },
    {
      id: 4,
      name: 'StudioAmp 500',
      category: 'Headphones',
      price: 449,
      originalPrice: 499,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      description: 'Professional studio headphones for mixing and mastering. Flat frequency response for accurate monitoring.',
      rating: 4.9,
      reviews: 211,
      badge: 'Pro'
    },
    {
      id: 5,
      name: 'NoiseFree Buds',
      category: 'Earbuds',
      price: 129,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqJFOmNxHmwQgfeR4i7cMISDZ4Q8uR_77-_e1q5Zgc_qrh2aBQymeGhVEjo1SXfrBoV89HI6S30hfFIh5oAIGQhcTE_hl1obSwFne6BzUQyDRC-lvgt3NfPiVXKqwEwlLqNwlrZI5bvaBdhsRXPvvzM4dZA7zAMHrT3eqXR_HPeAi0KNTHOTtkeZbeb1spZxGau9LjJ26FU9B924md0dOySsddjJx9aNT1sU8aR2Aq6yQlWVyX-pQ_ZjlhHxIlXfeiE6oU47L2dJSm',
      description: 'Budget-friendly earbuds with hybrid ANC. Great sound for everyday listening at an affordable price.',
      rating: 4.2,
      reviews: 305,
      badge: 'Popular'
    },
    {
      id: 6,
      name: 'BoomBar XL',
      category: 'Speakers',
      price: 279,
      originalPrice: 329,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmBodwUBzHvdyNZSxOB-eNq4NnDsK5jdmjZV9Okhy4u8vXjUn-L2ekMCuDWfq4KVqO225jNr0GaUpf8qLvmcKaw4e2HinYop6faxo-8jThKcu7bY0ZtC9Tpt5-g2X6F0AEZV4Hg8gcCzOe-dnn4sZjET0e970LDoVjnlQq0l0HWY9jtZoExOMDBcQbNJgHvr5q-NkrlmTwOvCKpfRTLdMDxJ__KGVZT7SvD8yRqfak9A9pb_xrbZcwjQY5QBMhoBTnXdgTx-ES8Y9t',
      description: 'Powerful party speaker with LED lighting effects and dual subwoofers. Bluetooth 5.3 and 30-hour battery.',
      rating: 4.4,
      reviews: 78,
      badge: 'Sale'
    },
    {
      id: 7,
      name: 'ClearSound ANC',
      category: 'Headphones',
      price: 199,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      description: 'Hybrid ANC headphones with transparency mode. Foldable design with USB-C quick charging.',
      rating: 4.3,
      reviews: 156,
      badge: 'New'
    },
    {
      id: 8,
      name: 'MiniPods Lite',
      category: 'Earbuds',
      price: 79,
      originalPrice: 99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqJFOmNxHmwQgfeR4i7cMISDZ4Q8uR_77-_e1q5Zgc_qrh2aBQymeGhVEjo1SXfrBoV89HI6S30hfFIh5oAIGQhcTE_hl1obSwFne6BzUQyDRC-lvgt3NfPiVXKqwEwlLqNwlrZI5bvaBdhsRXPvvzM4dZA7zAMHrT3eqXR_HPeAi0KNTHOTtkeZbeb1spZxGau9LjJ26FU9B924md0dOySsddjJx9aNT1sU8aR2Aq6yQlWVyX-pQ_ZjlhHxIlXfeiE6oU47L2dJSm',
      description: 'Compact and lightweight earbuds with 6-hour battery and 24-hour charging case. Perfect for commuters.',
      rating: 4.0,
      reviews: 412,
      badge: 'Sale'
    },
    {
      id: 9,
      name: 'DeskPod Studio',
      category: 'Speakers',
      price: 199,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmBodwUBzHvdyNZSxOB-eNq4NnDsK5jdmjZV9Okhy4u8vXjUn-L2ekMCuDWfq4KVqO225jNr0GaUpf8qLvmcKaw4e2HinYop6faxo-8jThKcu7bY0ZtC9Tpt5-g2X6F0AEZV4Hg8gcCzOe-dnn4sZjET0e970LDoVjnlQq0l0HWY9jtZoExOMDBcQbNJgHvr5q-NkrlmTwOvCKpfRTLdMDxJ__KGVZT7SvD8yRqfak9A9pb_xrbZcwjQY5QBMhoBTnXdgTx-ES8Y9t',
      description: 'Desktop studio speakers with built-in DAC and optical input. Balanced stereo sound for your workspace.',
      rating: 4.7,
      reviews: 94,
      badge: 'New'
    },
    {
      id: 10,
      name: 'SportBuds X2',
      category: 'Earbuds',
      price: 89,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqJFOmNxHmwQgfeR4i7cMISDZ4Q8uR_77-_e1q5Zgc_qrh2aBQymeGhVEjo1SXfrBoV89HI6S30hfFIh5oAIGQhcTE_hl1obSwFne6BzUQyDRC-lvgt3NfPiVXKqwEwlLqNwlrZI5bvaBdhsRXPvvzM4dZA7zAMHrT3eqXR_HPeAi0KNTHOTtkeZbeb1spZxGau9LjJ26FU9B924md0dOySsddjJx9aNT1sU8aR2Aq6yQlWVyX-pQ_ZjlhHxIlXfeiE6oU47L2dJSm',
      description: 'IPX5 sweat-resistant earbuds designed for athletes. Secure ear hooks and deep bass for workouts.',
      rating: 4.1,
      reviews: 227,
      badge: 'Popular'
    },
    {
      id: 11,
      name: 'ZenFlow ANC 200',
      category: 'Headphones',
      price: 349,
      originalPrice: 399,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      description: 'Over-ear headphones with premium memory foam cushions and 60-hour battery. Multi-device pairing.',
      rating: 4.7,
      reviews: 183,
      badge: 'Sale'
    },
    {
      id: 12,
      name: 'TowerSound Pro',
      category: 'Speakers',
      price: 499,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmBodwUBzHvdyNZSxOB-eNq4NnDsK5jdmjZV9Okhy4u8vXjUn-L2ekMCuDWfq4KVqO225jNr0GaUpf8qLvmcKaw4e2HinYop6faxo-8jThKcu7bY0ZtC9Tpt5-g2X6F0AEZV4Hg8gcCzOe-dnn4sZjET0e970LDoVjnlQq0l0HWY9jtZoExOMDBcQbNJgHvr5q-NkrlmTwOvCKpfRTLdMDxJ__KGVZT7SvD8yRqfak9A9pb_xrbZcwjQY5QBMhoBTnXdgTx-ES8Y9t',
      description: 'High-fidelity tower speaker with Wi-Fi streaming, Dolby Atmos support and smart home integration.',
      rating: 4.9,
      reviews: 51,
      badge: 'Pro'
    }
  ]);

  // Return all products
  getAllProducts(): Product[] {
    return this.products();
  }

  // Return unique categories with "All" at the beginning
  getCategories(): string[] {
    const allCategories = this.products().map(p => p.category);
    const uniqueCategories = [...new Set(allCategories)];
    return ['All', ...uniqueCategories];
  }
}
