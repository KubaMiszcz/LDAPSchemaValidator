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
  validationReport = '';
  entities: IEntity[] = [];
  allEntriesOnly: ILDAPEntry[] = [];

  version: string = packageJson.version;
  build: string = packageJson.build;

  constructor(
    private validationService: ValidationService,
    private ldapService: LDAPService
  ) {}

  analyzeSchema() {
    this.ldifSchemaRawInput = this.validationService.validateRawInput(
      this.ldifSchemaRawInput
    );

    this.entities = this.importEntities(this.ldifSchemaRawInput);

    // this.extractEntitiesKEYSVALUESDEPR();
    this.allEntriesOnly = this.entities.map((e) => e.ldapEntry);

    // let test = this.entities.filter((e) => !e.cn);
    // console.log(test);

    // this.validationResults = this.createSummary(this.entities);
    this.validateSchema(this.entities);

    this.generateReport();
  }



  validateSchema(entities: IEntity[]) {
    this.entities.forEach((entity) => {
      let errors: string[] = [];

      switch (entity.entryType) {
        case ENTRY_TYPES.USER:
          errors.push(
            this.validationService.checkForDuplicatedEntriesByPropName(
              entity.ldapEntry,
              this.allEntriesOnly,
              'dn'
            )
          );
          // this.validationService.checkForDuplicated_uid(entity, this.allDNs)
          // this.validationService.checkForDuplicated_uidnumber(entity, this.allDNs)
          //users with suplicated IDS
          //griup wont exist
          // checkForDuplicatedUserIds
          // checkUsersHomeDirectories

          break;

        case ENTRY_TYPES.GROUP:
          // checkForDuplicatedGroupIds
          // checkGroupsForMissingMemberUids();

          break;

        case ENTRY_TYPES.GROUP_OF_NAMES:
          // checkGroupsOfNamesForMissingMembers
          break;

        case ENTRY_TYPES.ORGANIZATIONAL_UNIT:
          break;

        default:
          break;
      }

      if (errors.length > 0) {
        entity.errors = errors;
      }
    });
  }

  importEntities(ldifSchemaRawInput: string): IEntity[] {
    let entities: IEntity[] = [];
    let rawEntries = this.ldapService.extractRawEntries(ldifSchemaRawInput);

    rawEntries.forEach((e) => {
      entities.push({
        ldapEntry: this.ldapService.convertRawEntryToObject(e),
        entryType: this.ldapService.getEntityType(e),
        errors: [],
      });
    });

    return entities;
  }

  generateReport() {
    this.validationReport = '';
    let msg = '';
    this.entities.forEach((e) => {
      if (e.errors?.length) {
        msg = `ERR: for dn:\n${e.ldapEntry.dn}\n`;
        e.errors.forEach((err) => (msg += err));
        msg += `\n`;
      }

      this.validationReport += msg+'\n';
    });
  }

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  // createSummary(entities: ILDAPEntry[]) {
  //   let result = '';

  //   entities.forEach((entity) => {
  //     let msg = '';
  //     Object.entries(entity)
  //       .map((entry) => entry[1])
  //       .filter((e) => typeof e === 'string')
  //       .filter((e) => e.startsWith('ERR'))
  //       .forEach((v) => {
  //         msg += 'ERR: in entity [dn: ' + entity.dn + ']\n' + '\t' + v + '\n';
  //         console.log(msg);
  //       });

  //     result += msg;
  //   });

  //   return result;
  // }

  checkGroupsOfNamesForMissingMembers() {
    let result = '';

    // this.entities
    //   .filter((e) => e.typeDEPR === ENTRY_TYPES.GROUP_OF_NAMES)
    //   .forEach((entity) => {
    //     let err = false;
    //     let msg = `ERR: in GroupOfNames [ dn: ${entity.dn} ]\n`;

    //     entity.member?.forEach((m) => {
    //       if (!this.allDNsDEPR.some((dn) => dn === m)) {
    //         msg += `\tmember doesnt exist: ${m}\n`;
    //         err = true;
    //       }
    //     });

    //     result += err ? msg + '\n' : '';
    //   });

    return result;
  }

  checkForDuplicatedUserIds() {
    //   let entities = this.entities.filter((e) => e.typeDEPR === ENTRY_TYPES.USER);
    //   return this.ldapService.checkForDuplicatedEntitiesByPropName(
    //     entities,
    //     'uidnumber'
    //   );
    // }
    // checkForDuplicatedGroupIds() {
    //   let entities = this.entities.filter(
    //     (e) => e.typeDEPR === ENTRY_TYPES.GROUP
    //   );
    //   return this.ldapService.checkForDuplicatedEntitiesByPropName(
    //     entities,
    //     'gidnumber'
    //   );
  }

  checkGroupsForMissingMemberUids() {}

  checkUsersHomeDirectories() {
    let result = '';

    // this.entities
    //   .filter((e) => e.type === ENTRY_TYPES.USER)
    //   .forEach((entity) => {
    //     let err = false;
    //     let msg = `ERR: in User [ dn: ${entity.dn} ]\n`;

    //     // if (entity.homedirectory?.split('/').last) {

    //     // }
    //     // let properHomeDir=

    //     // entity.homedirectory?.forEach((m) => {
    //     //   if (!this.allDNs.some((dn) => dn === m)) {
    //     //     msg += `\tmember doesnt exist: ${m}\n`;
    //     //     err = true;
    //     //   }
    //     // });

    //     result += err ? msg + '\n' : '';
    //   });

    return result;
  }
}
