import { Injectable } from '@angular/core';
import { IEntity } from '../models/Entity.model';
import { ILDAPEntry } from '../models/LDAPEntity.model';
import { ENTRY_TYPES } from '../models/LDAPEntryTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateRawInput(ldifSchemaRawInput: string): string {
    return ldifSchemaRawInput.replaceAll('\n ', '');
  }

  checkForDuplicatedEntriesByPropName(
    entry: ILDAPEntry,
    allEntries: ILDAPEntry[],
    propName: string,
    type: ENTRY_TYPES = ENTRY_TYPES.OTHER
  ) {
    let list = allEntries.filter((u) => u[propName as keyof ILDAPEntry] === entry[propName as keyof ILDAPEntry]);
    if (list.length > 1) {
      let msgs: string[] = [];
      list.forEach((e) => {
        // msgs.push(`\tduplicated [ ${propName} ] for: ${e[propName as keyof ILDAPEntry]}`);
        msgs.push(`\tduplicated entry with dn [ ${e.dn} ] >>> [ ${propName} ] = [ ${e[propName as keyof ILDAPEntry]} ]`);
      });
      return msgs.join('\n');
    }

    return '';
  }

  checkForHomedirectory(ldapEntry: ILDAPEntry): string {
    let path = ldapEntry.homedirectory?.split('/');
    let dirname = path?.slice(path.length - 1).toString();

    if (dirname?.toLowerCase() !== ldapEntry.cn?.toLowerCase()) {
      return `\thomedirectory name [ ${dirname} ] differs than cn [ ${ldapEntry.cn} ]`;
    }

    return '';
  }

  checkIfEntryExistByPropName(ldapEntry: ILDAPEntry, entries: ILDAPEntry[], propName: string): string {
    if (!entries.some((g) => g[propName as keyof ILDAPEntry] === ldapEntry[propName as keyof ILDAPEntry])) {
      return `\tentry with [ ${propName} ] = [ ${ldapEntry[propName as keyof ILDAPEntry]} ] wont exists`;
    }

    return '';
  }
}
