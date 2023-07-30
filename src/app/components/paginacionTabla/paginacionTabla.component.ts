import { Component, OnInit, Input, Output,EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginacionTabla',
  templateUrl: './paginacionTabla.component.html',
  styleUrls: ['./paginacionTabla.component.css']
})
export class PaginacionTablaComponent implements OnInit {

  @Input() rows:number= 10;
  @Input() pages:number = 0;
  @Output() selectPage= new EventEmitter<any>();

  currentPage:number =1;
  listaPaginas: any[] = [];
  
  constructor() { }

  ngOnInit() {
    this.generarPaginacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rows'] || changes['pages']){
      this.generarPaginacion();
    }
  }

  generarPaginacion(){
    this.listaPaginas =[];
    for(let i= 1; i<=this.pages; i++){
      this.listaPaginas.push(i);
    }
  }

  _selectPage(page:number){
    this.currentPage = page;
    this.selectPage.emit(page);
  }

  before(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.selectPage.emit(this.currentPage);
    }
  }

  after(){
    if(this.currentPage < this.pages){
      this.currentPage++;
      this.selectPage.emit(this.currentPage);
    }
  }
}
