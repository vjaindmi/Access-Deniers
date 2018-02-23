import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

import { Config } from '../app/app.config';

import { Events } from 'ionic-angular';


@Injectable()
export class CloudService {

  private serverUrl: string;
  private userId: string;
  private authToken: string;


  protected config: Config;


  constructor(public http: Http, public events: Events) {
    this.config = Config.getInstance();
   
    console.log('Hello CloudService Provider');
  }
 
 

  getRouteDetails(data){
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
        if (res['responseData']['responseCode'] === 1) {
          
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
