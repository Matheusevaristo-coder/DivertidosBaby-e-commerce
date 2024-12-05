import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent {
  private snackBar = inject(MatSnackBar);
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  produtoForm: FormGroup;

  constructor() {
    this.produtoForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      subtitle: new FormControl(null, [Validators.required]),
      imagemlink: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      availableInStock: new FormControl(null, [Validators.required]),
    });
  }

  async submitForm() {
    try {
      const produto: Produto = this.produtoForm.value;
      const success = await this.produtoService.addProduto(produto).toPromise();

      if (!success) {
        this.snackBar.open(
          'Erro ao adicionar produto. Tente novamente.',
          'Fechar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
        return;
      }

      this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
      });

      this.router.navigate(['produtos']);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      this.snackBar.open('Erro inesperado. Por favor, tente novamente.', 'Fechar', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
      });
    }
  }
}
