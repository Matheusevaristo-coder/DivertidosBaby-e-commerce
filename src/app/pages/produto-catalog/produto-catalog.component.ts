import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProdutoService } from '../../services/produto.service';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-catalog',
  standalone: true,
  imports: [CommonModule, ProdutoCardComponent],
  templateUrl: './produto-catalog.component.html',
  styleUrls: ['./produto-catalog.component.scss']
})
export class ProdutoCatalogComponent {
  private produtoService = inject(ProdutoService);
  produtosArray: Produto[] = [
    {
      id: 1,
      title: "Coleção Halloween 1",
      subtitle: "Disponível nos tamanhos P, M, G e GG",
      imagemlink: "https://images.tcdn.com.br/img/img_prod/888402/body_e_touca_abobora_halloween_393_5_697b5deac0c336182642430024068687.jpg",
      price: 39.90,
      description: "O primeiro Halloween do seu bebê é especial! Celebre com nossa fantasia 'Meu Primeiro Halloween'. Cada detalhe foi pensado com amor e cuidado para garantir conforto e estilo. 🎃",
      availableInStock: 10
    },
    {
      id: 2,
      title: "Conjunto Natalino",
      subtitle: "Disponível nos tamanhos P, M, G e GG",
      imagemlink: "https://artstudiomaju.com/wp-content/uploads/2021/11/entaoenatal-bolas-bolasdenatal-body-bodynatal-natal-bodypersonalizado-personalizado-presente-bebe-presentenatal-artstudiomaju-guarulhos.jpg",
      price: 49.90,
      description: "Vista o seu bebê com o espírito natalino! Nosso conjunto de Natal é feito com material confortável e perfeito para a época mais festiva do ano. 🎅",
      availableInStock: 8
    },
    {
      id: 3,
      title: "Fantasia de Super-herói",
      subtitle: "Disponível nos tamanhos P, M, G e GG",
      imagemlink: "https://www.boutiquebabykids.com.br/cdn/shop/files/MacacaoBebeTematicoPokemonPikachu_2.webp?v=1731806960&width=1500",
      price: 45.90,
      description: "Transforme seu pequeno no super-herói favorito! Nossa fantasia é feita com tecidos de alta qualidade para garantir conforto e diversão. 🦸",
      availableInStock: 15
    }

  ];

  constructor() {
    this.produtoService.getAllProdutos().subscribe((produtosArray: Produto[]) => {
      this.produtosArray = [...this.produtosArray, ...produtosArray];
    });
  }

  trackByProdutoId(index: number, item: Produto): number {
    return item.id;
  }
}
