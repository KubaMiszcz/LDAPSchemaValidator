import { Injectable } from '@angular/core';
import { ILDAPEntry } from '../models/LDAPEntity.model';
import { ENTRY_TYPES } from '../models/LDAPEntryTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class LDAPService {
  constructor() {}

  extractRawEntries(ldifSchemaRawInput: string) {
    return ldifSchemaRawInput
      .split('\n\n')
      .filter((e) => e.includes('dn: '));
  }

  convertRawEntryToObject(rawEntry: string): ILDAPEntry {
    let entry: ILDAPEntry = {
      dn: this.getSinglePropertyInRawEntity(rawEntry, 'dn') ?? '',
      cn: this.getSinglePropertyInRawEntity(rawEntry, 'cn'),
      dc: this.getSinglePropertyInRawEntity(rawEntry, 'dc'),
      description: this.getSinglePropertyInRawEntity(rawEntry, 'description'),
      gidnumber: this.getSinglePropertyInRawEntity(rawEntry, 'gidnumber'),
      homedirectory: this.getSinglePropertyInRawEntity(
        rawEntry,
        'homedirectory'
      ),
      members: this.getPropertiesInRawEntity(rawEntry, 'member'),
      memberuids: this.getPropertiesInRawEntity(rawEntry, 'memberuid'),
      o: this.getSinglePropertyInRawEntity(rawEntry, 'o'),
      objectclasses: this.getPropertiesInRawEntity(rawEntry, 'objectclass'),
      ou: this.getSinglePropertyInRawEntity(rawEntry, 'ou'),
      sn: this.getSinglePropertyInRawEntity(rawEntry, 'sn'),
      uid: this.getSinglePropertyInRawEntity(rawEntry, 'uid'),
      uidnumber: this.getSinglePropertyInRawEntity(rawEntry, 'uidnumber'),
      userpassword: this.getSinglePropertyInRawEntity(rawEntry, 'userpassword'),
      version: this.getSinglePropertyInRawEntity(rawEntry, 'version'),
    };

    return entry;
  }

  getSinglePropertyInRawEntity(entity: string, propName: string) {
    let result = this.getPropertiesInRawEntity(entity, propName);
    if (result.length > 1) {
      //kmm move it to errors in entity
      let msg = `ERR: more than one prop [ ${propName} ] with values: ${result}`;
      return msg;
    }

    return result[0];
  }

  getPropertiesInRawEntity(entity: string, propName: string): string[] {
    propName = propName + ': ';
    return entity
      .split('\n')
      .filter((s) => s.startsWith(propName))
      .map((p) => p.replace(propName, '').trim());
  }

  getEntityType(entity: string): ENTRY_TYPES {
    let objectclasses = this.getPropertiesInRawEntity(entity, 'objectclass');
    //kmm what if few of same classes?
    if (objectclasses.some((c) => c === 'groupOfNames')) {
      return ENTRY_TYPES.GROUP_OF_NAMES;
    }
    if (objectclasses.some((c) => c === 'organizationalUnit')) {
      return ENTRY_TYPES.ORGANIZATIONAL_UNIT;
    }
    if (objectclasses.some((c) => c === 'posixAccount')) {
      return ENTRY_TYPES.USER;
    }
    if (objectclasses.some((c) => c === 'posixGroup')) {
      return ENTRY_TYPES.GROUP;
    }

    return ENTRY_TYPES.OTHER;
  }
}
