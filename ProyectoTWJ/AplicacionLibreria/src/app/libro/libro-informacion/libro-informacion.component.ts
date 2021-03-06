import { Component, OnInit } from '@angular/core';
import {MasterURlService} from "../../services/master-url.service";
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CarritoService} from "../../services/carrito.service";

@Component({
  selector: 'app-libro-informacion',
  templateUrl: './libro-informacion.component.html',
  styleUrls: ['./libro-informacion.component.css']
})
export class LibroInformacionComponent implements OnInit {
  libro={
    titulo:'',
    categoria:'',
    editorial:'',
    precio:'',
    idAutor:''
  };
  autor={};
  _parametros:any;

  constructor(private _http:Http,private _masterURL:MasterURlService, private _activetedRoute:ActivatedRoute, private carrito:CarritoService, private router:Router) {
  }

  ngOnInit() {
    this.cargarLibro();
  }

  cargarLibro(){
    this._activetedRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._http.get(this._masterURL.url+'libro/'+this._parametros.id)
        .subscribe(
          (res)=>{
            this.libro=res.json();
            this.autor=this.libro.idAutor;
          },
          (err)=>{
            console.log(err);
          }
        )
    });
  }

  agregarCarrito(id){
    this.carrito.agregarLibro(id);
    this.router.navigate(['/carrito']);
  }


}
