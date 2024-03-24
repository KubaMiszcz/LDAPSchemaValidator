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

  checkForDuplicatedEntriesByPropName(entry: ILDAPEntry, allEntries: ILDAPEntry[], propName: string) {
    let list = allEntries.filter(
      (u) =>
        u[propName as keyof ILDAPEntry] ===
        entry[propName as keyof ILDAPEntry]
    );

    if (list.length > 1) {
      return `\tduplicated [ ${propName} ] for: ${list.map((e) => `\n\t\t[ ${e.dn} ]`)}`;
    }
    
    return '';
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