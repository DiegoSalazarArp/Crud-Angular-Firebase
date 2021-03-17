import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.models';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-angular-20850-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }
  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }


  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }
    
  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo), 
        delay(3000)
        );
  }

  private crearArreglo(heroeObj: object) {
    const heroes: HeroeModel[] = [];

    console.log(heroeObj);

    if (heroeObj == null) {
      return [];
    }

    Object.keys(heroeObj).forEach((key) => {
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }


}
