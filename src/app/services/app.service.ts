import { Injectable } from '@angular/core';
import packageJson from './../../../package.json';
import { ILDAPEntry } from '../models/LDAPEntity.model';
import { ValidationService } from './validation.service';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { LDIFService } from './ldif.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  ldifSchemaRawInput = EXAMPLE_LDIF_SCHEMA;
  validationResults = '';
  entries: ILDAPEntry[] = [];
  allDNs: string[] = [];

  version: string = packageJson.version;
  build: string = packageJson.build;

  constructor(
    private validationService: ValidationService,
    private ldifService: LDIFService
  ) {}

  validateSchema(): string {
    let result = '';
    this.validationService.validateRawInput(this.ldifSchemaRawInput);
    this.entries = this.ldifService.extractEntries(this.ldifSchemaRawInput);
    // this.extractEntitiesKEYSVALUESDEPR();
    this.allDNs = this.entries.map((e) => e.dn);

    // let test = this.entities.filter((e) => !e.cn);
    // console.log(test);

    // this.validationResults = this.createSummary(this.entities);
    // this.validationResults += this.checkForDuplicatedUserIds();
    // this.validationResults += this.checkForDuplicatedGroupIds();
    // // this.generatedOutput += this.checkGroupsForMissingMemberUids();
    // this.validationResults += this.checkGroupsOfNamesForMissingMembers();
    // this.validationResults += this.checkUsersHomeDirectories();

    return result
  }

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
}
