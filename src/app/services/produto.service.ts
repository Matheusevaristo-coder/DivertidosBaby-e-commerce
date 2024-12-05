import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'https://sua-api-url.com/produtos'; // Verifique se esta URL está correta

  constructor(private http: HttpClient) {}

  addProduto(produto: Produto): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, produto);
  }

  getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}
