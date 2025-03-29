import { Produto } from './../classes';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent {

  produto: Produto = new Produto();

  novoProduto: Produto = new Produto();
  
  listaProdutos: Produto[] = [];

  valorTotal: number = 0;

  habilitaEdicao: boolean = false;

  idControl: number = 0;

  resetarProduto() {
    this.produto = {
      id: 0,
      comprado: false,
      nome: '',
      valor: 0,
      quantidade: 0,
      subtotal: 0
    };
  }

  calcularTotal() {
    this.valorTotal = Number(this.listaProdutos.reduce((acc, item) => {
      return acc + parseFloat((item.subtotal).toString());
    }, 0).toFixed(2));
  }

  adicionarProduto() {
    if (this.produto.nome !== '' && this.produto.valor !== 0 && this.produto.quantidade !== 0) {
      this.produto.id = this.idControl;
      this.produto.comprado = false;
      this.produto.subtotal = this.produto.valor * this.produto.quantidade;
      
      this.listaProdutos.push(this.produto);
      
      this.idControl += 1;
      
      this.calcularTotal();
      
      this.resetarProduto();
    }
  }

  riscarProduto(produto: Produto) {
    if (produto.comprado) {
      this.listaProdutos[produto.id].comprado = false;
    } else {
      this.listaProdutos[produto.id].comprado = true;
    } 
  }

  habilitarEdicao(editProduto: Produto) {
    this.habilitaEdicao = true;
    this.novoProduto = editProduto;
  }

  salvarEdicao(editProduto: Produto) {    
    this.listaProdutos = this.listaProdutos.map((item) => {
      if (item.id === this.novoProduto.id) {
        return {
          ...item,
          nome: editProduto.nome,
          valor: editProduto.valor,
          quantidade: editProduto.quantidade,
          subtotal: editProduto.valor * editProduto.quantidade
        };
      } else {
        return item
      }
    });

    this.habilitaEdicao = false;
    this.calcularTotal();
    console.table(this.listaProdutos);
  }

  removerProduto(produto: Produto) {
    this.listaProdutos = this.listaProdutos.filter((item) => item.id !== produto.id);
    this.calcularTotal();
  }

  limparLista() {
    this.listaProdutos = [];
    this.valorTotal = 0;
    this.habilitaEdicao = false;
  }
}
