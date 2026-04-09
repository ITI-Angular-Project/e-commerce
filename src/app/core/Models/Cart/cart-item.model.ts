export interface CartItem {
  id: number | undefined;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  subtitle: string;
  amount: number;
  price: number;
  // product?: Product;
  productId: number;
  // userId: number;
}
