import { Injectable } from '@angular/core';
import packageJson from './../../../package.json';


@Injectable({
  providedIn: 'root',
})
export class AppService {

  version: string = packageJson.version;
  build: string = packageJson.build;

  constructor(
  ) {
  }

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
