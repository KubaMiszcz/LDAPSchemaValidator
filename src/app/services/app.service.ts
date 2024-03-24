import { Injectable } from '@angular/core';
import packageJson from './../../../package.json';
import { ILDAPEntity } from '../models/LDAPEntity.model';


@Injectable({
  providedIn: 'root',
})
export class AppService {

  version: string = packageJson.version;
  build: string = packageJson.build;

  constructor(
  ) {
  }

  checkForDuplicatedEntitiesByPropName(
    entities: ILDAPEntity[],
    propName: string
  ) {
    let result = '';

    entities.forEach((entity) => {
      let msg = `ERR: in ${propName} [ dn: ${entity.dn} ]\n`;
      let err = false;
      let list = entities.filter(
        (u) =>
          u[propName as keyof ILDAPEntity] ===
          entity[propName as keyof ILDAPEntity]
      );
      if (list.length > 1) {
        msg +=
          `\tduplicated ${propName} for: ` +
          `${list.map((e) => `\n\t\t[ ${e.dn} ]`)}\n`;
        err = true;
      }
      result += err ? `${msg}\n` : '';
    });

    return result;
  }


  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  // pivotArray2<T1>(array: [T1[]]) {
  //   let rows = array.length;
  //   let cols = array[0].length;
  //   let pivotedArray: T1any[] = [];

  //   for (let index = 0; index < cols; index++) {
  //     let pivotedRow: T1[] = [];
  //     array.forEach((row) => {
  //       pivotedRow.push(row[index]);
  //     });

  //     pivotedArray.push(pivotedRow);
  //   }

  //   console.log(pivotedArray);
  // }

  pivotArray(array: any[]) {
    let rows = array.length;
    let cols = array[0].length;
    let pivotedArray: any[] = [];

    for (let index = 0; index < cols; index++) {
      let pivotedRow: string[] = [];
      array.forEach((row: string[]) => {
        pivotedRow.push(row[index]);
      });

      pivotedArray.push(pivotedRow);
    }

    console.log(pivotedArray);
  }
}
