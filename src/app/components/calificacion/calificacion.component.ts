import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  constructor() { }

  @Input() calificacion: any = 0;
  @Output() select = new EventEmitter<any>();

  lista: any[] =[];

  faStar = faStar;

  ngOnInit() {
    this.lista = []
    for(let i= 1; i <=this.calificacion; i++){
      this.lista.push(1);
    }
  }

  mostrarCalificacion(){
    this.select.emit(this.calificacion);
  }
}
