import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  private map:GoogleMap;
  constructor(public navCtrl: NavController, private platform: Platform) 
  {
    this.platform.ready().then(()=>{
      GoogleMap.isAvailable().then(()=>{
        this.map = new GoogleMap('map_canvas');
        this.map.one(GoogleMapsEvent.MAP_READY).then((data:any)=>{
          //lets center map based in our position
          Geolocation.getCurrentPosition().then(pos => {
            let myPosition = new GoogleMapsLatLng(pos.coords.latitude, pos.coords.longitude);
            this.map.animateCamera({target: myPosition, zoom: 10});
            this.map.addMarker({
              'position': myPosition,
              'title': 'Tu sei qui'
            });
          });
          
        });
      })
      .catch(()=> alert("GoogleMaps Native SDK is not available"));
    });
  }

  ionViewDidLoad() {
    console.log('Hello MapPage Page');
  }

}
