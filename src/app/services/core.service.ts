import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(
  ) {
  }


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
}