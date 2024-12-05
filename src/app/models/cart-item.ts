import { Produto } from "./produto";

export interface CartItem {
    product: Produto;
    quantity: number;
}
