export type Values = {
  brand: string;
  model: string;
  phone_values?: {
    RAM: string;
    ROM: string;
    processador: string;
    GHZ: number;
    G: number;
    cam_mpx: number;
    batery:  number;
    charge_speed: number;
    OS: string;
    screen: {
      hz: number;
      tech: "OLED" | "AMOLED";
      dimensions: string;
    }
    has_credit?: boolean;
    credit_price?: number;
  };
}


type Product = {
  id: string;
  name: string;
  type: string;
  variations: string [];
  cost: number;
  values: Values;
  images_url: string [];
}

export default Product;