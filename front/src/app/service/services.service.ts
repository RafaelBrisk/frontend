import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { Lanche, UnidadeMedida, Ingrediente } from '../models';

@Injectable()
export class ServicesService {

  constructor(
    private http: Http
  ) { }

  public postLanche(lanche: Lanche): Observable<Response> {
    return this.http.post('lanche', Object.assign({}, lanche));
  }

  public putLanche(lanche: Lanche): Observable<Response> {
    return this.http.put('lanche', Object.assign({}, lanche));
  }

  public getLanche(id: number): Observable<Lanche> {
    return this.http.get(`lanche/${id}`).map((res: Response) => res.json());
  }

  public getAllLanches(): Observable<Lanche[]> {
    return this.http.get('lanche').map((res: Response) => res.json());
  }

  public deleteLanche(id: number): Observable<Response> {
    return this.http.delete(`lanche/${id}`);
  }

  public postUnidadeMedida(unidadeMedida: UnidadeMedida): Observable<Response> {
    return this.http.post('unidade-medida', Object.assign({}, unidadeMedida));
  }

  public putUnidadeMedida(unidadeMedida: UnidadeMedida): Observable<Response> {
    return this.http.put('unidade-medida', Object.assign({}, unidadeMedida));
  }

  public getUnidadeMedida(id: number): Observable<UnidadeMedida> {
    return this.http.get(`unidade-medida/${id}`).map((res: Response) => res.json());
  }

  public getAllUnidadeMedidas(): Observable<UnidadeMedida[]> {
    return this.http.get('unidade-medida').map((res: Response) => res.json());
  }

  public deleteUnidadeMedida(id: number): Observable<Response> {
    return this.http.delete(`unidade-medida/${id}`);
  }

  public postIngrediente(ingrediente: Ingrediente): Observable<Response> {
    return this.http.post('ingrediente', Object.assign({}, ingrediente));
  }

  public putIngrediente(ingrediente: Ingrediente): Observable<Response> {
    return this.http.put('ingrediente', Object.assign({}, ingrediente));
  }

  public getIngrediente(id: number): Observable<Ingrediente> {
    return this.http.get(`ingrediente/${id}`).map((res: Response) => res.json());
  }

  public getAllIngredientes(): Observable<Ingrediente[]> {
    return this.http.get('ingrediente').map((res: Response) => res.json());
  }

  public deleteIngrediente(id: number): Observable<Response> {
    return this.http.delete(`ingrediente/${id}`);
  }

}
