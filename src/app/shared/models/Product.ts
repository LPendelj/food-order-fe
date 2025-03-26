export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
  category: string;
  restaurantId: string;
  available: boolean;
  preparationTime?: number; // in minutes
  calories?: number;
  allergens?: string[];
  customizationOptions?: {
    name: string;
    options: {
      name: string;
      price: number;
    }[];
  }[];
} 