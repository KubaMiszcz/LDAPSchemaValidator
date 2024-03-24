import { ILDAPEntry } from './LDAPEntity.model';
import { ENTRY_TYPES } from './LDAPEntryTypes.enum';

export interface IEntity {
  ldapEntry:ILDAPEntry
  errors?: string[];
  entryType: ENTRY_TYPES;
}