import { ENTITY_TYPES } from './LDAPTypes.enum';

export interface ILDAPEntity {
  dn: string;
  cn?: string;
  dc?: string;
  description?: string;
  gidnumber?: string;
  homedirectory?: string;
  member?: string[];
  memberuid?: string[];
  o?: string;
  objectclass?: string[];
  ou?: string;
  sn?: string;
  uid?: string;
  uidnumber?: string;
  userpassword?: string;
  version?: string;

  type: ENTITY_TYPES;
  content?: string;
  props?: IKeyValues[];
}

export interface IKeyValues {
  key: string;
  values: string[];
}

export class KeyValues implements IKeyValues {
  key = '';
  values = [];
}
