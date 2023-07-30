import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Auto } from '../interface/auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

constructor(private http: HttpClient) { }
baseUrl = "http://www.epico.gob.ec/vehiculo/public/api/";

getAutos(filtro?:string, rows?:number, page?:number){
  let body = new HttpParams();
  body = filtro ? body.set('filtro',filtro) : body;
  body = rows ? body.set('rows',rows) : body;
  body = page ? body.set('page',page) : body;
  return this.http.get<any>(this.baseUrl+"vehiculos/", {params:body});
}

eliminarAuto(codigo:string){
  return this.http.delete<any>(this.baseUrl+'vehiculo/'+codigo);
}

agregarAuto(auto:Auto){
  let body = this.getParamsAuto(auto);
  return this.http.post<any>(this.baseUrl+'vehiculo/', body);
}

actualizarAuto(auto:Auto, codigo:string){
  let body = this.getParamsAuto(auto);
  return this.http.put<any>(this.baseUrl+'vehiculo/' + codigo, body);
}

getAuto(codigo:string){
  return this.http.get<any>(this.baseUrl + "vehiculo/" + codigo);
}


getParamsAuto(auto:Auto){
  let body = new HttpParams();
  body = auto.codigo ? body.set('codigo',auto.codigo) : body;
  body = auto.marca ? body.set('marca',auto.marca) : body;
  body = auto.modelo ? body.set('modelo',auto.modelo) : body;
  body = auto.anio ? body.set('anio',auto.anio) : body;
  body = auto.calificacion ? body.set('calificacion',auto.calificacion) : body;
  body = auto.foto ? body.set('foto',auto.foto) : body;
  body = auto.usuario ? body.set('usuario',auto.usuario) : body;
  body = auto.usuario_mod ? body.set('usuario_mod',auto.usuario_mod) : body;
  
  return body;
}


}

