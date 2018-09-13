import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbMapperService {

  constructor() { }

  snapshotToArray(snapshot): any[] {
    let returnArr = [];
  
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
  
    return returnArr;
  };

  snapshotToObject(snapshot){
    let item = snapshot.val();
    item.key = snapshot.key;
  
    return item;
  }
}
