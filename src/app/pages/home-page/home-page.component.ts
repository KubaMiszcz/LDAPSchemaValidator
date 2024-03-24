import { ILDAPEntityKEYSVALUES } from './../../models/LDAPEntity.model';
import { ILDAPEntity } from 'src/app/models/LDAPEntity.model';
import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { DATA_TYPES, ENTITY_TYPES } from 'src/app/models/LDAPTypes.enum';
import { IKeyValues } from 'src/app/models/KeyValues';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  ldifSchemaRawInput = EXAMPLE_LDIF_SCHEMA;
  entities: ILDAPEntity[] = [];
  entitiesKEYSVALUES: ILDAPEntityKEYSVALUES[] = [];
  allDNs: string[] = [];
  generatedOutput = '';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.validateSchema();
    // this.extractEntities();
  }

  checkForOrphans() {
    let result = '';

    this.validateSchema();
    // this.extractEntities();
    this.extractEntitiesKEYSVALUES();
    this.allDNs = this.entities.map((e) => e.dn);

    // let test = this.entities.filter((e) => !e.cn);
    // console.log(test);

    this.checkGroupsOfNamesForMissingMembers();

    this.checkGroupsForMissingMemberUids();
    this.checkForDuplicatedUserIds();
    this.checkForDuplicatedGroupIds();
    this.checkUsersHomeDirectories();
  }

  validateSchema() {
    this.ldifSchemaRawInput = this.ldifSchemaRawInput.replaceAll('\n ', '');
  }

  extractEntities() {
    let rawEntities = this.ldifSchemaRawInput
      .split('\n\n')
      .filter((e) => e.startsWith('# Entry'));

    this.entities = [];
    rawEntities.forEach((e) => {
      let entity: ILDAPEntity = {
        dn: this.getSinglePropertyInRawEntity(e, 'dn') ?? '',
        cn: this.getSinglePropertyInRawEntity(e, 'cn'),
        dc: this.getSinglePropertyInRawEntity(e, 'dc'),
        description: this.getSinglePropertyInRawEntity(e, 'description'),
        gidnumber: this.getSinglePropertyInRawEntity(e, 'gidnumber'),
        homedirectory: this.getSinglePropertyInRawEntity(e, 'homedirectory'),
        member: this.getPropertiesInRawEntity(e, 'member'),
        memberuid: this.getPropertiesInRawEntity(e, 'memberuid'),
        o: this.getSinglePropertyInRawEntity(e, 'o'),
        objectclass: this.getPropertiesInRawEntity(e, 'objectclass'),
        ou: this.getSinglePropertyInRawEntity(e, 'ou'),
        sn: this.getSinglePropertyInRawEntity(e, 'sn'),
        uid: this.getSinglePropertyInRawEntity(e, 'uid'),
        uidnumber: this.getSinglePropertyInRawEntity(e, 'uidnumber'),
        userpassword: this.getSinglePropertyInRawEntity(e, 'userpassword'),
        version: this.getSinglePropertyInRawEntity(e, 'version'),
        type: this.getType(e),
      };

      this.entities.push(entity);
    });

    console.log(this.entities);
  }

  getType(entity: string): ENTITY_TYPES {
    let objectclasses = this.getPropertiesInRawEntity(entity, 'objectclass');
    if (objectclasses.find((c) => c === 'groupOfNames')) {
      return ENTITY_TYPES.GROUP_OF_NAMES;
    }
    if (objectclasses.find((c) => c === 'organizationalUnit')) {
      return ENTITY_TYPES.ORGANIZATIONAL_UNIT;
    }
    if (objectclasses.find((c) => c === 'posixAccount')) {
      return ENTITY_TYPES.USER;
    }
    if (objectclasses.find((c) => c === 'posixGroup')) {
      return ENTITY_TYPES.GROUP;
    }

    return ENTITY_TYPES.OTHER;
  }

  getSinglePropertyInRawEntity(entity: string, propName: string) {
    let result = this.getPropertiesInRawEntity(entity, propName);
    if (result.length > 1) {
      let msg =
        "ERR: more than one prop '" +
        propName +
        "'" +
        ' with values: ' +
        result;
      return msg;
    }

    return result[0];
  }

  getPropertiesInRawEntity(entity: string, propName: string): string[] {
    propName = propName + ': ';
    return entity
      .split('\n')
      .filter((s) => s.startsWith(propName))
      .map((p) => p.replace(propName, '').trim());
  }

  checkGroupsForMissingMemberUids() {}
  checkGroupsOfNamesForMissingMembers() {
    // let allGroupOfMembers
  }
  checkForDuplicatedUserIds() {}
  checkForDuplicatedGroupIds() {}
  checkUsersHomeDirectories() {}

  extractEntitiesKEYSVALUES() {
    let rawEntities = this.ldifSchemaRawInput
      .split('\n\n')
      .filter((e) => e.startsWith('# Entry'));

    this.entitiesKEYSVALUES = [];
    rawEntities.forEach((e) => {
      let entity: ILDAPEntityKEYSVALUES = {
        dn: '',
      };
      let rows = e.split('\n').filter((r) => !r.startsWith('#'));
      let keyvalues = rows.map((r) => {
        let pair=        r.split(': ')
        let result: IKeyValues = {
          key: pair[0],
          values: [pair[1]],
        };
        return result;
      });

      entity.dn = keyvalues.find((k) => k.key === 'dn')?.values[0];
      entity.props=keyvalues;
      console.log(entity);
    });

    //       };

    //       this.entitiesKEYSVALUES.push(entity);
    //     });

    //     console.log(this.entities);
  }
}
