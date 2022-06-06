import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSetting';
import { dfNetflix } from './Netflix.models';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private http: HttpClient) { }

  getStateShapes(titles : string) {
    return this.http.get( AppSettings._API + 'StatoCast/' + titles);
  }
  getData(titles : string) {
    return this.http.get<dfNetflix[]>( AppSettings._API + 'InfoFilmApi/' + titles);
  }
}