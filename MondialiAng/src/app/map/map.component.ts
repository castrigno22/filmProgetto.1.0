import { Component, AfterViewInit, Input, SimpleChanges  } from '@angular/core';
import * as L from 'leaflet';
import { ShapeService } from '../shape.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit  {
  private Mymap : any;
  private states : any;
  private tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 1.5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  @Input()
  titles : string = "natio";
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.shapeService.getStateShapes(this.titles).subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }

  private initMap(): void {
    this.Mymap = L.map('map', {
      center: [ 45.4773, 9.1815 ],
      zoom: 1
    });
  

  this.tiles.addTo(this.Mymap);

}

  constructor(private shapeService: ShapeService) { }



  private initStatesLayer() {
    this.Mymap.eachLayer((layer : any) => {
      layer.remove();
    });
    this.tiles.addTo(this.Mymap);

    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      })
    });

    this.Mymap.addLayer(stateLayer);
  }

  ngAfterViewInit(): void {
    this.initMap();
    
  }
}