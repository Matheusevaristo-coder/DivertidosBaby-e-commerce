import { Routes } from '@angular/router';
import { ProdutoCatalogComponent } from './pages/produto-catalog/produto-catalog.component';
import { ProdutoFormComponent } from './pages/produto-form/produto-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", redirectTo: "produtos", pathMatch: "full" },
    { path: "produtos", component: ProdutoCatalogComponent },
    { path: "form", component: ProdutoFormComponent, canActivate: [authGuard] },
    { path: "**", component: NotFoundComponent },
];
