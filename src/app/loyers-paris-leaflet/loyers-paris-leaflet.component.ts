import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet'
import { FormControl } from '@angular/forms';

const iconRetinaUrl = 'assets/icons8-info-popup-16.png';
const iconUrl = 'assets/icons8-info-popup-16.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [40, 30]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-loyers-paris-leaflet',
  templateUrl: './loyers-paris-leaflet.component.html',
  styleUrls: ['./loyers-paris-leaflet.component.css']
})
export class LoyersParisLeafletComponent implements AfterViewInit {

  map: any;
  arrondissements: any;
  quartiers: any;
  loyersQuartier: any;
  loyerQuartier0 = {
    "max": "",
    "min": "",
    "ref": ""
  }
  loyerQuartier1 = {
    "max": "",
    "min": "",
    "ref": ""
  }
  loyerQuartier2 = {
    "max": "",
    "min": "",
    "ref": ""
  }
  loyersQuartierHtml: any;


  //resultLoyer = false;

  constructor(private route: Router, private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.createMap();
    this.addMarkerAndLayersQuartiers()
  }

  createMap() {
    const centreParis = {
      lat: 48.856614,
      lng: 2.3522219
    };

    const zoomLevel = 12;

    this.map = L.map("map", {
      center: [centreParis.lat, centreParis.lng],
      zoom: zoomLevel,

    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //this.map.on('click', this.hideForm);

    mainLayer.addTo(this.map);
  }

  addMarkerArrondissements() {
    this.http.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arrondissements&q=&rows=20&sort=c_ar').subscribe({
      next: (data) => {
        this.arrondissements = data;
        console.log(this.arrondissements.records)
        for (let index in this.arrondissements.records) {
          const lat = this.arrondissements.records[index].fields.geom_x_y[0];
          const lng = this.arrondissements.records[index].fields.geom_x_y[1];
          const marker = L.marker([lat, lng]);
          marker.addTo(this.map);
        }
      },
      error: (err) => { console.log(err) }
    });
  }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 1,
      color: 'var(--dark-green)',
      fillOpacity: 1,
      fillColor: 'var(--dark-green)'
    });
  }

  private resetFeature(e: any) {
    const layer = e.target;
    layer.setStyle({
      weight: 1,
      opacity: 1,
      color: 'var(--dark-green)',
      fillOpacity: 0.5,
      fillColor: 'var(--dark-green)'
    });
  }

  addMarkerAndLayersQuartiers() {
    this.http.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=quartier_paris&q=&rows=80').subscribe({
      next: (data) => {
        this.quartiers = data;
        //console.log(this.quartiers.records)
        for (let index in this.quartiers.records) {
          //fonction pour ajouter des marqueurs ci-desous
          /*const lat = this.quartiers.records[index].fields.geom_x_y[0];
          const lng = this.quartiers.records[index].fields.geom_x_y[1];
          const marker = L.marker([lat, lng]);
          marker.bindPopup(this.clickMarkerPopup(this.quartiers.records[index]));
          marker.on('click', function (e) {
            let formulaire = document.getElementById("formulaire");
            if (getComputedStyle(formulaire!).display != "none" && !L.popup().isOpen) {
              formulaire!.style.display = "none";
            } else {
              formulaire!.style.display = "block";
            }
          }) 
          marker.addTo(this.map)*/
          const quartiersLayer = L.geoJSON(this.quartiers.records[index].fields.geom, {
            style: (feature) => ({
              weight: 1,
              opacity: 1,
              color: 'var(--dark-green)',
              fillOpacity: 0.5,
              fillColor: 'var(--dark-green)'
            }),
            onEachFeature: (feature, layer) => (
              layer.on({
                mouseover: (e) => (this.highlightFeature(e)),
                mouseout: (e) => (this.resetFeature(e)),
              })
            )
          });
          var customOptions =
          {
            'className': 'label'
          }
          quartiersLayer.bindPopup(this.clickMarkerPopup(this.quartiers.records[index]),customOptions);
          /*
          quartiersLayer.on('click', function (e) {
            let formulaire = document.getElementById("formulaire");
            if (getComputedStyle(formulaire!).display != "none" && !L.popup().isOpen) {
              formulaire!.style.display = "none";
            } else {
              formulaire!.style.display = "block";
            }
          })
          */
          this.map.addLayer(quartiersLayer);
        }
      },
      error: (err) => { console.log(err) }
    });
  }


  clickMarkerPopup(data: any) {
    return `` +
      `<div><font size="4">  Quartier : <b id="nomQuartier">${data.fields.l_qu}<b> </font> </div>`
  }



  voirLoyer(loyer: any) {
    let nomQuartier = document.getElementById("nomQuartier")?.innerHTML;
    let l = nomQuartier?.length;
    if (l != null) {
      //console.log(nomQuartier!.substring(0, l - 8));
      //this.resultLoyer = true;
      this.http.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=logement-encadrement-des-loyers&q=&refine.nom_quartier=' + nomQuartier!.substring(0, l - 8) + '&refine.piece=' + loyer.pieces + '&refine.epoque=' + loyer.epoque + '&refine.meuble_txt=' + loyer.typLoc).subscribe({
        next: (data) => {

          this.loyersQuartier = data;
          this.loyerQuartier0 = {
            "max": this.loyersQuartier.records[0].fields.max,
            "min": this.loyersQuartier.records[0].fields.min,
            "ref": this.loyersQuartier.records[0].fields.ref
          }
          this.loyerQuartier1 = {
            "max": this.loyersQuartier.records[1].fields.max,
            "min": this.loyersQuartier.records[1].fields.min,
            "ref": this.loyersQuartier.records[1].fields.ref
          }
          this.loyerQuartier2 = {
            "max": this.loyersQuartier.records[2].fields.max,
            "min": this.loyersQuartier.records[2].fields.min,
            "ref": this.loyersQuartier.records[2].fields.ref
          }
        },
        error: (err) => { console.log(err) }
      });
    }
  }
}
