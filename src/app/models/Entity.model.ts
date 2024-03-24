import { ILDAPEntry } from './LDAPEntity.model';
import { ENTITY_TYPES } from './LDAPTypes.enum';

export interface IEntity {
  ldapEntry:ILDAPEntry
  errors?: string[];
  type: ENTITY_TYPES;
}