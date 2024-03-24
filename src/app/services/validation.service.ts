import { Injectable } from '@angular/core';
import { IEntity } from '../models/Entity.model';
import { ILDAPEntry } from '../models/LDAPEntity.model';


@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateRawInput(ldifSchemaRawInput: string): string {
    return ldifSchemaRawInput.replaceAll('\n ', '');
  }

  checkForDuplicated_dn(entry: ILDAPEntry, allEntries: ILDAPEntry[], propName: string) {
    return allEntries.filter(e => e.dn === entry.dn).length > 1;
  }

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

  checkForDuplicatedEntitiesByPropNameDEPR(
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
}