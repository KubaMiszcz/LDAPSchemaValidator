import { IKeyValuesDEPR, KeyValues } from './../../models/KeyValues.model';
import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import {
  EXAMPLE_KEYSVALUES,
  EXAMPLE_TEMPLATE,
} from 'src/assets/app-example-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  inputData = EXAMPLE_KEYSVALUES;
  generatedOutput = 'result';
  template = EXAMPLE_TEMPLATE;
  keys: string[] = [];
  valuesRows: string[][] = [];
  keysWithValues: KeyValues[] = [];

  ignoredNewLineChar = '|';
  keysDelimiter = ';';
  keysDelimiterText = ';';
  valuesDelimiter = '\t';
  valuesDelimiterText = '\\t';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.extractData();
    this.fillTextAreasContent(this.keys);
  }
  
  extractData() {
    // this.validateInput();
    this.validateDelimiters();
    
    this.keys = this.inputData.singleRowWithAllKeys.trim().split(this.keysDelimiter).map(k=>k.trim());
    this.valuesRows = [];
    
    // this.appService.pivotArray(values);
    
    this.inputData.singleRowWithAllValues
    .trim()
    .split('\n')
    .forEach((row) => {
      this.valuesRows.push(row.split(this.valuesDelimiter));
    });

    this.fillTextAreasContent(this.keys);
  }

  validateDelimiters() {
    if (this.keysDelimiterText==='\\t') {
      this.keysDelimiter='\t'
    }
    if (this.keysDelimiterText==='\\n') {
      this.keysDelimiter='\n'
    }
    if (this.valuesDelimiterText==='\\t') {
      this.valuesDelimiter='\t'
    }
    if (this.valuesDelimiterText==='\\n') {
      this.valuesDelimiter='\n'
    }
  }

  fillTextAreasContent(keys: string[]) {
    this.keysWithValues = [];

    keys.forEach((k) => {
      let idx = keys.indexOf(k);
      let keyValue: IKeyValuesDEPR = {
        key: k,
        values: '',
      };

      this.valuesRows.forEach((v) => {
        keyValue.values += v[idx] + '\n';
      });

      this.keysWithValues.push(keyValue);
    });
  }


  generateOutput() {
    // check if same length in stringvalues
    let result = '';
    
    this.valuesRows.forEach((valueRow) => {
      let entryToAppend = this.template;
      valueRow.forEach((value) => {
        let idx = valueRow.indexOf(value);
        let key = this.keys[idx];
        entryToAppend = entryToAppend.replaceAll(key, value);
      });

      result += entryToAppend + '\n\n';
    });

    this.generatedOutput = result;
    console.log(result);
  }
}
