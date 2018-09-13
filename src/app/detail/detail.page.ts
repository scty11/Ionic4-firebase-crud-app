import { Component, OnInit } from '@angular/core';

import * as firebase from 'Firebase';
import { ActivatedRoute, Router  } from '@angular/router';
import { DbMapperService } from '../db-mapper.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  info = {};

  constructor(private route: ActivatedRoute,
  public router: Router,
  public dbMapper: DbMapperService) {
  firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('key')).on('value', resp => {
    this.info = this.dbMapper.snapshotToObject(resp);
  });
}

  ngOnInit() {
  }

}
