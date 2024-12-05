import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  http: HttpClient;

  constructor() {
    this.http = inject(HttpClient);
  }

  getAllProdutos() {
    return this.http.get<Produto[]>("http://localhost:3000/produtos");
  }

  createProduto(newProduto: Produto) {
    return this.http.post<Produto[]>("http://localhost:3000/produtos", newProduto);
  }
}
