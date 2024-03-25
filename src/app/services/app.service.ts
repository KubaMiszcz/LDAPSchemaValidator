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

  constructor(private validationService: ValidationService, private ldapService: LDAPService) {}

  analyzeSchema() {
    this.ldifSchemaRawInput = this.validationService.validateRawInput(this.ldifSchemaRawInput);

    this.entities = this.importEntities(this.ldifSchemaRawInput);
    //kmm get import errors from rawentites values

    this.allEntriesOnly = this.entities.map((e) => e.ldapEntry);

    this.validateSchema(this.entities);

    this.generateReport();
  }

  validateSchema(entities: IEntity[]) {
    entities.forEach((entity) => {
      let errors: string[] = [];
      let warnings: string[] = [];

      switch (entity.entryType) {
        case ENTRY_TYPES.USER:
          errors.push(this.checkForDuplicated_dns(entity.ldapEntry, ENTRY_TYPES.USER));
          errors.push(this.checkForDuplicated_cns(entity.ldapEntry, ENTRY_TYPES.USER));
          errors.push(this.checkForDuplicated_uids(entity.ldapEntry, ENTRY_TYPES.USER));
          errors.push(this.checkForDuplicated_uidnumbers(entity.ldapEntry, ENTRY_TYPES.USER));
          errors.push(this.checkForMissingGroup(entity.ldapEntry, ENTRY_TYPES.GROUP));
          errors.push(this.validationService.checkForHomedirectory(entity.ldapEntry, ENTRY_TYPES.USER));
          break;

        case ENTRY_TYPES.GROUP:
          errors.push(this.checkForDuplicated_dns(entity.ldapEntry, ENTRY_TYPES.GROUP));
          errors.push(this.checkForDuplicated_gidnumbers(entity.ldapEntry, ENTRY_TYPES.GROUP));
          errors.push(...this.checkGroupsForMissingMembers(entity.ldapEntry, ENTRY_TYPES.GROUP));
          break;

        case ENTRY_TYPES.GROUP_OF_NAMES:
          errors.push(this.checkForDuplicated_dns(entity.ldapEntry, ENTRY_TYPES.GROUP_OF_NAMES));
          errors.push(...this.checkGroupsOfNamesForMissingMembers(entity.ldapEntry, ENTRY_TYPES.GROUP_OF_NAMES));
          break;

        case ENTRY_TYPES.ORGANIZATIONAL_UNIT:
          errors.push(this.checkForDuplicated_dns(entity.ldapEntry, ENTRY_TYPES.USER));
          break;

        default:
          errors.push(this.checkForDuplicated_dns(entity.ldapEntry, ENTRY_TYPES.USER));
          break;
      }

      errors = errors.filter((e) => !!e.length);
      if (errors.length > 0) {
        entity.errors = errors;
      }

      warnings = warnings.filter((e) => !!e.length);
      if (warnings.length > 0) {
        entity.warnings = warnings;
      }
    });
  }

  checkForDuplicated_gidnumbers(ldapEntry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkForDuplicatedEntriesByPropName(
      ldapEntry,
      this.getEntriesByType(ENTRY_TYPES.GROUP),
      'gidnumber',
      type
    );
  }

  checkForMissingGroup(ldapEntry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkIfEntryExistByPropName(
      ldapEntry,
      this.getEntriesByType(ENTRY_TYPES.GROUP),
      'gidnumber',
      type
    );
  }

  checkForDuplicated_uidnumbers(ldapEntry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkForDuplicatedEntriesByPropName(ldapEntry, this.allEntriesOnly, 'uidnumber',type);
  }

  checkForDuplicated_uids(ldapEntry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkForDuplicatedEntriesByPropName(ldapEntry, this.allEntriesOnly, 'uid',type);
  }
  checkForDuplicated_cns(ldapEntry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkForDuplicatedEntriesByPropName(ldapEntry, this.allEntriesOnly, 'cn', type);
  }

  checkForDuplicated_dns(entry: ILDAPEntry, type: ENTRY_TYPES): string {
    return this.validationService.checkForDuplicatedEntriesByPropName(entry, this.allEntriesOnly, 'dn',type);
  }

  getEntriesByType(type: ENTRY_TYPES): ILDAPEntry[] {
    return this.entities.filter((e) => e.entryType === type).map((e) => e.ldapEntry);
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
    let err = this.entities.filter((e) => e.errors?.length ?? 0 > 0);

    this.validationReport = '';
    this.entities.forEach((e) => {
      let msg = '';
      if (e.errors?.length) {
        msg = `ERR: for ${e.entryType} with dn: [ ${e.ldapEntry.dn} ]\n`;
        e.errors.forEach((err) => (msg += err + '\n'));
        this.validationReport += msg + '\n';
      }

    });

    this.entities.forEach((e) => {
      let msg = '';
      if (e.warnings?.length) {
        msg = `ERR: for ${e.entryType} with dn: [ ${e.ldapEntry.dn} ]\n`;
        e.warnings.forEach((err) => (msg += err + '\n'));
        this.validationReport += msg + '\n';
      }
    });
  }

  checkGroupsForMissingMembers(ldapEntry: ILDAPEntry,type: ENTRY_TYPES): string[] {
    let msg: string[] = [];
    let allUsers = this.getEntriesByType(ENTRY_TYPES.USER);
    let propName = 'uid';
    ldapEntry.memberuids?.forEach((uid) => {
      let user = allUsers.find((u) => u.uid === uid);
      if (!user) {
        msg.push(`\tmemberuid with [ ${propName} ] = [ ${ldapEntry[propName as keyof ILDAPEntry]} ] wont exists`);
      }
    });

    return msg;
  }

  checkGroupsOfNamesForMissingMembers(ldapEntry: ILDAPEntry,type: ENTRY_TYPES) {
    let msg: string[] = [];
    let allUsers = this.getEntriesByType(ENTRY_TYPES.USER);
    let propName = 'dn';
    ldapEntry.members?.forEach((dn) => {
      let user = allUsers.find((u) => u.dn === dn);
      if (!user) {
        msg.push(`\tmember with [ ${propName} ] = [ ${ldapEntry[propName as keyof ILDAPEntry]} ] wont exists`);
      }
    });

    return msg;
  }
}
