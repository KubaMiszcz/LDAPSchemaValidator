import { ENTITY_TYPES } from './LDAPTypes.enum';

export interface ILDAPEntry {
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

  //extract outside
  type: ENTITY_TYPES;
  content?: string;
  errors?: string[];
}

// export interface ILDAPEntityKEYSVALUES {
//   dn: string;
//   props?: IKeyValue<string>[];
// }
