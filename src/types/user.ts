import Product from "./products";

type User = {
  id: string;
  tag: string;
  uploaded: Product [];
  name: string;
  password: string;
  logged_at: Date;
  created_at: Date;
}

export default User;