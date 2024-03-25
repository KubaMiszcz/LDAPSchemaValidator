import { ENTRY_TYPES } from './LDAPEntryTypes.enum';

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
}

// export interface ILDAPEntityKEYSVALUES {
//   dn: string;
//   props?: IKeyValue<string>[];
// }
