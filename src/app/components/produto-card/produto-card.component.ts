import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/produto';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.scss']
})
export class ProdutoCardComponent {
  @Input() produto!: Produto;  

  constructor(private cartService: CartService) {}

  addProdutoToCart(produto: Produto) {
    console.log(`Adicionei o produto ${produto.title} ao carrinho!`);
    this.cartService.addItemToCart(produto);
  }
}
