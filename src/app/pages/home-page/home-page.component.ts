import { LDAPService } from '../../services/ldap.service';
import { ValidationService } from './../../services/validation.service';
import { ILDAPEntry } from 'src/app/models/LDAPEntity.model';
import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { DATA_TYPES, ENTRY_TYPES } from 'src/app/models/LDAPEntryTypes.enum';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  ldifSchemaRawInput = '';
  validationResults = '';

  constructor(
    private appService: AppService,
    private validationService: ValidationService,
    private ldapService: LDAPService
  ) {
    this.ldifSchemaRawInput = appService.ldifSchemaRawInput;
  }

  ngOnInit(): void {
    this.appService.analyzeSchema();
    this.validationResults = this.appService.validationReport;
  }

  analyzeSchema() {
    this.appService.ldifSchemaRawInput = this.ldifSchemaRawInput;
    this.appService.analyzeSchema();
    this.validationResults = this.appService.validationReport;
  }
}
