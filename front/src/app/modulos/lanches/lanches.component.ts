import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { ModalService } from '../../modal/modal.service';
import { ServicesService } from '../../service/services.service';
import { LanchesModalComponent, ResultLanche, LancheDialogModel } from './lanches.modal';
import { LancheIngrediente, Lanche, Ingrediente } from '../../models';

interface LancheSelecionado {
  selecionado: boolean;
  lanche: Lanche;
}

@Component({
  selector: 'app-lanches',
  templateUrl: './lanches.component.html',
  styleUrls: ['./lanches.component.scss']
})
export class LanchesComponent implements OnInit {

  public lanches: LancheSelecionado[];
  private currentLanche: LancheSelecionado;

  constructor(
    private modalService: BsModalService,
    private servicesService: ServicesService
  ) { }

  public ngOnInit() {
    this.loadLanches();
  }

  public createLanche(): void {
    this.openModal(new Lanche());
  }

  public updateLanche(): void {
    this.openModal(this.currentLanche.lanche);
  }

  public openInformationLanche(lanche: LancheSelecionado): void {
    if (this.currentLanche) {
      if (this.currentLanche.lanche.id !== lanche.lanche.id) {
        this.currentLanche.selecionado = false;
        this.currentLanche = lanche;
        this.currentLanche.selecionado = true;
      } else {
        this.currentLanche.selecionado = false;
        this.currentLanche = null;
      }
    } else {
      this.currentLanche = lanche;
      this.currentLanche.selecionado = true;
    }
  }

  public delete(): void {
    this.servicesService.deleteLanche(this.currentLanche.lanche.id).subscribe(() => {
      this.loadLanches();
    });
  }

  private openModal(lanche: Lanche): void {
    const modalService = new ModalService(this.modalService);
    modalService
      .addModal<LancheDialogModel, ResultLanche>(LanchesModalComponent, { lanche: lanche })
      .subscribe((res) => {
        switch (res) {
          case ResultLanche.CONCLUIDO:
            this.loadLanches();
        }
      });
  }

  private loadLanches(): void {
    this.servicesService.getAllLanches().subscribe((lanches) => {
      const lanchesSelecionados = [] as LancheSelecionado[];
      for (const lanche of lanches) {
        lanchesSelecionados.push({ lanche: lanche, selecionado: false });
      }
      this.lanches = lanchesSelecionados;
    });
  }

}
