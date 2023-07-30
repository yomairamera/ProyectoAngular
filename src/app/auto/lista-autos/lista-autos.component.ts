import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Auto } from 'src/app/interface/auto';
import { AutoService } from "src/app/services/auto.service";
import { FormGroup } from '@angular/forms';
@Component({
    selector: "lista-autos",
    templateUrl: "./lista-autos.component.html"
})

export class ListaAutosComponent implements OnInit{
    
    constructor(private autoServices: AutoService, 
        private formBuilder: FormBuilder){ }

    tituloListaAutos: string = "Lista de Automóviles"

    listaAutos: any[] = [];
    muestraImagen: boolean = false;
    filtro: string = "";

    formularioAuto :  FormGroup;

    rows: number = 5;
    pages: number ;
    page: number = 1;
    
    ngOnInit(){
        this.consultaAutos();
        this.formularioAuto = this.formBuilder.group({
          "marca": [null],
          "modelo":[null],
          "codigo": [null],
          "anio": [null],
          "calificacion": [null],
          "foto": [null],
          "usuario": [null],
          "usuario_mod": [null]
        });
    }

    consultaAutos(){
        this.autoServices.getAutos(this.filtro, this.rows, this.page).subscribe((respuesta)=>{
          if(respuesta.codigo == 1){
            this.listaAutos = respuesta.data;
            this.rows = respuesta.rows;
            this.pages = respuesta.pages;
          }
        });
      }

    toggleImage(): void{
        this.muestraImagen = !this.muestraImagen
    }

    mostrarAlert(calificacion:any){
        alert("La calificación es: " + calificacion);
    }

    eliminarAuto(auto: any){
        this.autoServices.eliminarAuto(auto.id).subscribe((respuesta)=>{
            if(respuesta.codigo == 1){
              alert(respuesta.mensaje);
              this.consultaAutos();
            }
          });
    }

    getListaAutos(){
        //this.listaAutos = this.autoServices.filtrarAuto(this.filtro);
        return this.listaAutos;
    }


    guardarAuto(){
        let auto:Auto = {...this.formularioAuto.value};
        console.log(auto);
        this.autoServices.agregarAuto(auto).subscribe((respuesta)=>{
          alert(respuesta.mensaje);
          console.log(respuesta);
          if(respuesta.codigo == 1){
            this.consultaAutos();
            this.clearAuto()
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
    
      seleccionarPagina(page:number){
        this.page = page;
        this.consultaAutos();
      }
    
      cambioRows(){
        this.page = 1;
        this.consultaAutos();
      }

      clearAuto(){
        this.formularioAuto.reset();
      }
}