import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

import { Config } from '../../app/app.config';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-travel',
  templateUrl: 'travel.html'
})
export class TravelPage {
  transport :any;
  protected config: Config;

  constructor(public navCtrl: NavController,
   public navParams: NavParams, public http: Http, public events: Events) {
    this.config = Config.getInstance();
    
  }

  ionViewDidLoad() {
  
  }
  back(){
    this.navCtrl.setRoot(HomePage);
  }

  getRouteDetail()
  {
    var transist = ["transist", "walking", "driving","bicycling"];
    transist.forEach((item, index) => {
      let data = {
        
           "source" : "Guindy",
           "destination" : "Ashok Pillar",
           "mode" : item,
           "places" : [
            "Bank",
            "Restaurant"
            ]
          
       };
      this.getRouteDetails(data,item).then(function () {});
    });
    
    
    
    
    
    


  }
  getRouteDetails(data,id){
    let url = 'https://756d2755.ngrok.io/api/get/directions';
    let body = JSON.stringify({
     
        "source" : "Guindy",
        "destination" : "Ashok Pillar",
        "mode" : "transit",
        "places" : [
         "Bank",
         "Restaurant"
         ]
       
    });

    return new Promise((resolve, reject) => {
      this.post(url, body).then(res => {
        if (res) {
          this.transport=res;
          console.log(this.transport['routes']);
        }
      }, err => {
        reject(err);
      });
    });
  }

 
  post(url: string, body: any) {
    

    return new Promise((resolve, reject) => {


    let headers = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options)
        .timeout(15000)
        .subscribe(res => {
          resolve(res.json());
        }, error => {
          reject({
            "message": "Server Error. Please Try Again."
          });
        });
    });
  }


}