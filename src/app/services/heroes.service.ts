import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
/* delay hace una demora en el servicio */
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-c9a0e.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe( heroe: HeroeModel ) {

    //Quitar propiedad de un objeto
/*     const heroeTem = {
      nombre: heroe.nombre,
      poder: heroe.poder,
      estado: heroe.estado
    } */
    const heroeTem = {
      ...heroe
    }
    delete heroeTem.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTem);
  }

  getHeroe( id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  obtenerHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
        .pipe(
          map( this.crearArreglo),
          delay(0)
        )
  }

  private crearArreglo( heroesObj: object ) {

    const heroes: HeroeModel[] = [];
    /* console.log(heroesObj); */

    if( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }

  deleteHeroe( id: string ) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
