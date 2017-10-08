import { Ingrediente, Lanche, UnidadeMedida } from '.';

export class LancheIngrediente {
  constructor(
    public id?: number,
    public lanche?: Lanche,
    public ingrediente?: Ingrediente,
    public quantidade?: number,
    public unidadeMedida?: UnidadeMedida
  ) { }
}
