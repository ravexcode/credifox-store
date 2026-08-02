export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  price: number;
  qty: number;
  variation: string | null;
  image_url: string | null;
}

type Order = {
  id: string;
  user_id: string;
  status: string;
  payment_status: string;
  total: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export default Order;
