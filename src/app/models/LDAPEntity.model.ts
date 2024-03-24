import { IKeyValue, IKeyValues } from './KeyValues';
import { ENTITY_TYPES } from './LDAPTypes.enum';

export interface ILDAPEntity {
  dn: string;
  cn?: string;
  dc?: string;
  description?: string;
  gidnumber?: string;
  homedirectory?: string;
  o?: string;
  ou?: string;
  sn?: string;
  uid?: string;
  uidnumber?: string;
  userpassword?: string;
  version?: string;
  member?: string[];
  memberuid?: string[];
  objectclass?: string[];

  type: ENTITY_TYPES;
  content?: string;
}

export interface ILDAPEntityKEYSVALUES {
  dn: string;
  props?: IKeyValue<string>[];
}
