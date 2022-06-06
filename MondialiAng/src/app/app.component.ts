import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from './appSetting';
import { dfNetflix } from './Netflix.models';
import { ShapeService } from './shape.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MondialiAng';
  obs : Observable <dfNetflix[]> = undefined!;


  @Input()listaDati: dfNetflix[]= undefined!;
  dataFrame: Observable<dfNetflix[]>| undefined;
  dati : dfNetflix[] = undefined!;
  

  constructor(private shapeService: ShapeService,private http : HttpClient){

   }

  ngOnInit(): void {
    
  }
  trova(film : HTMLInputElement){
    let m = film.value;
    console.log(m)
    this.obs = this.http.get<dfNetflix[]>(AppSettings._API + "InfoFilmApi/"+ m )
    this.obs.subscribe(this.passaDati)
  }
  passaDati = (data: dfNetflix[]) => {
    this.dati = data;
    
    console.log(this.dati)
  }
}
