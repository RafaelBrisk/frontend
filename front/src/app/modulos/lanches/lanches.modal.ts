import { Component, OnInit } from '@angular/core';
import { Lanche, UnidadeMedida, Ingrediente, LancheIngrediente } from '../../models';
import { ServicesService } from '../../service/services.service';

export const enum ResultLanche {
  CONCLUIDO,
  CANCELADO
}

export interface LancheDialogModel {
  lanche: Lanche;
}

@Component({
  templateUrl: './lanches.modal.html'
})
export class LanchesModalComponent implements LancheDialogModel, OnInit {

  public close: (result: ResultLanche) => void;
  public lanche: Lanche;
  public unidadesMedidas: UnidadeMedida[];
  public ingredientes: Ingrediente[];

  constructor(private servicesService: ServicesService) { }

  public ngOnInit() {
    this.servicesService.getAllUnidadeMedidas().subscribe((res) => {
      this.unidadesMedidas = res;
    });

    this.servicesService.getAllIngredientes().subscribe((res) => {
      this.ingredientes = res;
    });
  }

  public concluir(): void {
    this.servicesService.postLanche(this.lanche).subscribe((res) => {
      this.close(ResultLanche.CONCLUIDO);
    });
  }

  public isValid(): boolean {
    return !!(this.lanche.nome && this.lanche.valor);
  }

  public addIngrediente(): void {
    const novoIngrediente = new LancheIngrediente();
    novoIngrediente.ingrediente = this.ingredientes[0];
    novoIngrediente.quantidade = 1;
    novoIngrediente.unidadeMedida = this.unidadesMedidas[0];
    this.lanche.ingredientes.push(novoIngrediente);
  }

}
