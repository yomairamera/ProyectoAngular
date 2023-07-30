import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoService } from 'src/app/services/auto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Auto } from 'src/app/interface/auto';

@Component({
  selector: 'app-lista-autos-detalle',
  templateUrl: './lista-autos-detalle.component.html',
  styleUrls: ['./lista-autos-detalle.component.css']
})
export class ListaAutosDetalleComponent implements OnInit {

  auto: any;
  isEditable:boolean=false;
  codigoAuto:string;
  formularioAuto: FormGroup;
  constructor(private autoServices: AutoService, 
              private routes:ActivatedRoute, 
              private  formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formularioAuto = this.formBuilder.group({
      "marca":[],
      "modelo":[],
      "anio":[],
      "codigo":[],
      "imagenUrl":[]
    }

    )
    this.routes.params.subscribe((params:any)=>{
      this.codigoAuto =params['codigo'];
      this.consultarAuto();
    })
  }

  consultarAuto(){
    this.autoServices.getAuto(this.codigoAuto).subscribe((respuesta)=>{
      if(respuesta.codigo == '1'){
        this.auto = respuesta.data;
        this.inicializarFormulario();
      }
    });
  }

    inicializarFormulario(){
    this.formularioAuto.controls['marca'].setValue(this.auto.marca);
    this.formularioAuto.controls['modelo'].setValue(this.auto.modelo);
    this.formularioAuto.controls['anio'].setValue(this.auto.anio);
    this.formularioAuto.controls['codigo'].setValue(this.auto.codigo);
    this.formularioAuto.controls['id'].setValue(this.auto.id);
    this.formularioAuto.controls['foto'].setValue(this.auto.foto);
    this.formularioAuto.controls['calificacion'].setValue(this.auto.calificacion);
  }

  editarAuto(){
    this.isEditable = true;
  }

  cancelarAuto(){
    this.isEditable = false;
    this.inicializarFormulario();
  }

  grabarAuto(){
    let auto:Auto = {...this.formularioAuto.value};
    this.autoServices.actualizarAuto(auto, this.auto.id).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        this.isEditable = false;
        this.auto.marca = this.formularioAuto.controls['marca'].value;
        this.auto.codigo = this.formularioAuto.controls['codigo'].value;
        this.auto.modelo = this.formularioAuto.controls['modelo'].value;
        this.auto.calificacion = this.formularioAuto.controls['calificacion'].value;
        this.auto.foto = this.formularioAuto.controls['foto'].value;
        this.auto.anio = this.formularioAuto.controls['anio'].value;
        alert(respuesta.mensaje);
      }
    },
    (errorHttp:HttpErrorResponse) => {
      console.log(errorHttp.error);
      let mensaje = errorHttp.error.mensaje;
      mensaje += errorHttp.error.error?.codigo ? (' - ' + errorHttp.error.error?.codigo) : "";
      mensaje += errorHttp.error.error?.marca ? (' - ' + errorHttp.error.error?.marca) : "";
      mensaje += errorHttp.error.error?.modelo ? (' - ' + errorHttp.error.error?.modelo) : "";
      mensaje += errorHttp.error.error?.anio ? (' - ' + errorHttp.error.error?.anio) : "";
      alert(mensaje);
    });
  }
}
