import { LancheIngrediente } from '.';

export class Lanche {
  constructor(
    public id?: number,
    public nome?: string,
    public valor?: number,
    public ingredientes?: LancheIngrediente[]
  ) {
    this.ingredientes = [];
  }
}
