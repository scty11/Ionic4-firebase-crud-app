import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { DbMapperService } from '../db-mapper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  infos = [];
  ref = firebase.database().ref('infos/');

  constructor(public router: Router, 
    public alertController: AlertController,
    public dbMapper: DbMapperService) {
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = this.dbMapper.snapshotToArray(resp);
    });
  }

  addInfo() {
    this.router.navigate(['/add-info']);
  }

  edit(key) {
    this.router.navigate(['/edit/'+key]);
  }

  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.database().ref('infos/'+key).remove();
          }
        }
      ]
    });
  
    await alert.present();
  }
}
