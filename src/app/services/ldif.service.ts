import { Injectable } from '@angular/core';
import { ILDAPEntry } from '../models/LDAPEntity.model';
import { ENTITY_TYPES } from '../models/LDAPTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class LDIFService {
  constructor() {}

  checkForDuplicatedEntitiesByPropName(
    entities: ILDAPEntry[],
    propName: string
  ) {
    let result = '';

    entities.forEach((entity) => {
      let msg = `ERR: in ${propName} [ dn: ${entity.dn} ]\n`;
      let err = false;
      let list = entities.filter(
        (u) =>
          u[propName as keyof ILDAPEntry] ===
          entity[propName as keyof ILDAPEntry]
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

  extractEntries(ldifSchemaRawInput: string): ILDAPEntry[] {
    let entries: ILDAPEntry[] = [];

    let rawEntries = this.extractRawEntries(ldifSchemaRawInput);
    rawEntries.forEach((e) => {
      let entry: ILDAPEntry = {
        dn: this.getSinglePropertyInRawEntity(e, 'dn') ?? '',
        cn: this.getSinglePropertyInRawEntity(e, 'cn'),
        dc: this.getSinglePropertyInRawEntity(e, 'dc'),
        description: this.getSinglePropertyInRawEntity(e, 'description'),
        gidnumber: this.getSinglePropertyInRawEntity(e, 'gidnumber'),
        homedirectory: this.getSinglePropertyInRawEntity(e, 'homedirectory'),
        member: this.getPropertiesInRawEntity(e, 'member'),
        memberuid: this.getPropertiesInRawEntity(e, 'memberuid'),
        o: this.getSinglePropertyInRawEntity(e, 'o'),
        objectclass: this.getPropertiesInRawEntity(e, 'objectclass'),
        ou: this.getSinglePropertyInRawEntity(e, 'ou'),
        sn: this.getSinglePropertyInRawEntity(e, 'sn'),
        uid: this.getSinglePropertyInRawEntity(e, 'uid'),
        uidnumber: this.getSinglePropertyInRawEntity(e, 'uidnumber'),
        userpassword: this.getSinglePropertyInRawEntity(e, 'userpassword'),
        version: this.getSinglePropertyInRawEntity(e, 'version'),
        type: this.getEntityType(e),
      };

      entries.push(entry);
    });

    return entries;
  }

  extractRawEntries(ldifSchemaRawInput: string) {
    return ldifSchemaRawInput
      .split('\n\n')
      .filter((e) => e.startsWith('# Entry'));
  }

  getEntityType(entity: string): ENTITY_TYPES {
    let objectclasses = this.getPropertiesInRawEntity(entity, 'objectclass');
    //kmm what if few of same classes?
    if (objectclasses.some((c) => c === 'groupOfNames')) {
      return ENTITY_TYPES.GROUP_OF_NAMES;
    }
    if (objectclasses.some((c) => c === 'organizationalUnit')) {
      return ENTITY_TYPES.ORGANIZATIONAL_UNIT;
    }
    if (objectclasses.some((c) => c === 'posixAccount')) {
      return ENTITY_TYPES.USER;
    }
    if (objectclasses.some((c) => c === 'posixGroup')) {
      return ENTITY_TYPES.GROUP;
    }

    return ENTITY_TYPES.OTHER;
  }

  getSinglePropertyInRawEntity(entity: string, propName: string) {
    let result = this.getPropertiesInRawEntity(entity, propName);
    if (result.length > 1) {
      //kmm move it to errors
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
}
