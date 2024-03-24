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
    let list = allEntries.filter((u) => u[propName as keyof ILDAPEntry] === entry[propName as keyof ILDAPEntry]);
    if (list.length > 1) {
      let msgs: string[] = [];
      list.forEach((e) => {
        msgs.push(`\tduplicated [ ${propName} ] for: ${e[propName as keyof ILDAPEntry]}`);
      });
      return msgs.join('\n');
    }

    return '';
  }

  checkHomedirectory(ldapEntry: ILDAPEntry): string {
    let path = ldapEntry.homedirectory?.split('/');
    let dirname = path?.slice(path.length - 1).toString();

    if (dirname?.toLowerCase() !== ldapEntry.cn?.toLowerCase()) {
      return `\thomedirectory name [ ${dirname} ] differs than cn [ ${ldapEntry.cn} ]`;
    }

    return '';
  }

  checkIfGroupExistById(ldapEntry: ILDAPEntry, allGroups: ILDAPEntry[], propName: string): string {
    if (allGroups.some((g) => g.gidnumber === ldapEntry.gidnumber)) {
      return `\tgroup with [ ${propName} ] = [ ${ldapEntry.gidnumber} ] wont exists`;
    }

    return '';
  }
}
