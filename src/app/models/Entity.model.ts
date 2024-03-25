import { ILDAPEntry } from './LDAPEntity.model';
import { ENTRY_TYPES } from './LDAPEntryTypes.enum';

export interface IEntity {
  ldapEntry: ILDAPEntry;
  entryType: ENTRY_TYPES;
  errors?: string[];
  warnings?: string[];
}
