export interface Product {
    product_name: string;
    price: number;
    customer_review: number;
    recommendation_stars: number;
    short_description: string;
    sizes: string[];
    colors: string[];
    sku: string;
    category: string;
    tags: string[];
    full_description: string;
    additional_info: string;
    images: string[];
    discount: number;
    new: boolean;
    message_card: string;
  }
  