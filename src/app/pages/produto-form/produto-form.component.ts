import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  private produtoService = inject(ProdutoService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  produtoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    imagemlink: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    availableInStock: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  submitForm() {
    if (this.produtoForm.valid) {
      this.produtoService.createProduto(this.produtoForm.value).subscribe({
        next: () => {
          this.snackBar.open('Produto adicionado com sucesso!', 'Fechar');
          this.router.navigate(['/produtos']);
        },
        error: () => {
          this.snackBar.open('Erro ao adicionar produto. Tente novamente.', 'Fechar');
        }
      });
    }
  }
}
