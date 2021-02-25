import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  id;

  constructor( private service: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
    if ( this.id != 'nuevo' ) {
      this.service.getHeroe(this.id).subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = this.id;
      })
    }
  }
  
  save( form: NgForm ) {

    if ( form.invalid ) {
      console.log('FORMULARIO NO VALIDO');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id  ) {
      peticion = this.service.actualizarHeroe( this.heroe );
    } else {
      peticion = this.service.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: this.heroe.nombre,
        text: 'Se ha actualizadó correctamente'
      })
    });

  }

}
