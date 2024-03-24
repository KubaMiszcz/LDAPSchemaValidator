import { Injectable } from '@angular/core';
import packageJson from './../../../package.json';
import { ILDAPEntry } from '../models/LDAPEntity.model';
import { ValidationService } from './validation.service';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { LDAPService } from './ldap.service';
import { IEntity } from '../models/Entity.model';
import { ENTRY_TYPES } from '../models/LDAPEntryTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  ldifSchemaRawInput = EXAMPLE_LDIF_SCHEMA;
  validationResults = '';
  // entriesDEPR: ILDAPEntry[] = [];
  entities: IEntity[] = [];
  allDNs: string[] = [];

  version: string = packageJson.version;
  build: string = packageJson.build;

  constructor(
    private validationService: ValidationService,
    private ldapService: LDAPService
  ) {}

  validateSchema(): string {
    let result = '';
    
    this.ldifSchemaRawInput = this.validationService.validateRawInput(
      this.ldifSchemaRawInput
    );

    this.entities = this.importEntities(this.ldifSchemaRawInput);

    // this.extractEntitiesKEYSVALUESDEPR();
    this.allDNs = this.entities.map((e) => e.ldapEntry.dn);

    // let test = this.entities.filter((e) => !e.cn);
    // console.log(test);

this.entities.forEach(e=>{
switch (e.entryType) {
  case ENTRY_TYPES.USER:
    
    break;

  default:
    break;
}

})


    // this.validationResults = this.createSummary(this.entities);
    // this.validationResults += this.checkForDuplicatedUserIds();
    // this.validationResults += this.checkForDuplicatedGroupIds();
    // // this.generatedOutput += this.checkGroupsForMissingMemberUids();
    // this.validationResults += this.checkGroupsOfNamesForMissingMembers();
    // this.validationResults += this.checkUsersHomeDirectories();

    return result;
  }

  importEntities(ldifSchemaRawInput: string): IEntity[] {
    let entities: IEntity[] = [];
    let rawEntries = this.ldapService.extractRawEntries(ldifSchemaRawInput);

    rawEntries.forEach(e=>{
      entities.push({
        ldapEntry:this.ldapService.convertRawEntryToObject(e),
        entryType: this.ldapService.getEntityType(e),
        errors:[],
      });
    })

    return entities;
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
