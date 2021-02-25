import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private service: HeroesService ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.service.obtenerHeroes().subscribe( res => {
      this.heroes = res;
      this.cargando = false;
    })
  }

  eliminar(heroe: HeroeModel, i: number) {
    /* Eliminar elemntos del arreglo en time real */
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar a: ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value) {
        this.heroes.splice(i, 1);
        this.service.deleteHeroe(heroe.id).subscribe();
      }
      Swal.fire({
        title: heroe.nombre,
        text: 'Eliminado correctamente',
        icon: 'success',
        allowOutsideClick: true
      }); 
    });

  }

}
