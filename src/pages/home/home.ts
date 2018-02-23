import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { NgModule,Component, ViewChild } from "@angular/core/";

 import { TravelPage } from '../travel/travel';
 import {  Nav, Events, MenuController, ModalController, LoadingController, AlertController } from 'ionic-angular';
 import { NavController } from 'ionic-angular';
 //import { CloudService } from '../../helpers/cloud-service';
 
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html',

 })

 export class HomePage {
   map: GoogleMap;
   
   constructor(private googleMaps: GoogleMaps,public navCtrl: NavController) { }

   @ViewChild(Nav) nav: NavController
   ionViewDidLoad() {
    this.loadMap();
   }
 
  loadMap() {
 
     let mapOptions: GoogleMapOptions = {
       camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
     };
 
     this.map = this.googleMaps.create('map_canvas', mapOptions);
 
     // Wait the MAP_READY before using any methods.
     this.map.one(GoogleMapsEvent.MAP_READY)
       .then(() => {
         console.log('Map is ready!');
 
         // Now you can use all methods safely.
         this.map.addMarker({
             title: 'Ionic',
             icon: 'blue',
             animation: 'DROP',
             position: {
               lat: 43.0741904,
               lng: -89.3809802
             }
           })
           .then(marker => {
             marker.on(GoogleMapsEvent.MARKER_CLICK)
               .subscribe(() => {
                 alert('clicked');
               });
           });
 
       });
   }
 
  Gotravel()
  {
    this.navCtrl.push(TravelPage);
  }
}





