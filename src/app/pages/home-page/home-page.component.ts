import { ILDAPEntityKEYSVALUES } from './../../models/LDAPEntity.model';
import { ILDAPEntity } from 'src/app/models/LDAPEntity.model';
import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { DATA_TYPES, ENTITY_TYPES } from 'src/app/models/LDAPTypes.enum';
import { IKeyValue, IKeyValues } from 'src/app/models/KeyValues';

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
    this.validateInput();
    this.extractEntities();
  }

  ValidateSchema() {
    this.validateInput();
    this.extractEntities();
    // this.extractEntitiesKEYSVALUESDEPR();
    this.allDNs = this.entities.map((e) => e.dn);

    // let test = this.entities.filter((e) => !e.cn);
    // console.log(test);

    this.generatedOutput = this.createSummary(this.entities);
    this.generatedOutput += this.checkGroupsOfNamesForMissingMembers();
    this.generatedOutput += this.checkForDuplicatedUserIds();

    // this.generatedOutput += this.checkGroupsForMissingMemberUids();
    // this.generatedOutput += this.checkForDuplicatedGroupIds();
    // this.generatedOutput += this.checkUsersHomeDirectories();
  }

  createSummary(entities: ILDAPEntity[]) {
    let result = '';

    entities.forEach((entity) => {
      let msg = '';
      Object.entries(entity)
        .map((entry) => entry[1])
        .filter((e) => typeof e === 'string')
        .filter((e) => e.startsWith('ERR'))
        .forEach((v) => {
          msg += 'ERR: in entity [dn: ' + entity.dn + ']\n' + '\t' + v + '\n';
          console.log(msg);
        });

      result += msg;
    });

    return result;
  }

  validateInput() {
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
        type: this.getEntityType(e),
      };

      this.entities.push(entity);
    });

    console.log(this.entities);
  }

  getEntityType(entity: string): ENTITY_TYPES {
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
      let msg = `ERR: more than one prop [ ${propName} ] with values: ${result}`;
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
    let result = '';

    this.entities
      .filter((e) => e.type === ENTITY_TYPES.GROUP_OF_NAMES)
      .forEach((entity) => {
        let err = false;
        let msg = `ERR: in GroupOfNames [ dn: ${entity.dn} ]\n'`;

        entity.member?.forEach((m) => {
          if (!this.allDNs.some((dn) => dn === m)) {
            msg += `\tmember doesnt exist: ${m}\n`;
            err = true;
          }
        });

        result += err ? msg + '\n' : '';
      });

    return result;
  }

  checkForDuplicatedUserIds() {
    let result = '';

    let uids = [];
    this.entities.forEach((entity) => {
      let msg = `ERR: in uidnumber [ dn: ${entity.dn} ]\n`;
      let err = false;
      let list = this.entities.filter((u) => u.uidnumber === entity.uidnumber);
      if (list.length > 1) {
        msg += `\tduplicated uidnumber for: ${list.map(
          (e) => `\n\t\t[ ${e.dn} ]`
        )}\n`;
        err = true;
      }
      result += err ? `${msg}\n` : '';
    });

    return result;
  }

  checkForDuplicatedEntitiesXXXXXXXXXXXXXXXX(propName: string) {
    let result = '';

    this.entities.forEach((entity) => {
      let msg = `ERR: in ${propName} [ dn: ${entity.dn} ]\n`;
      let err = false;
      let list = this.entities.filter((u) => u.uidnumber === entity.uidnumber);
      if (list.length > 1) {
        msg +=
          `\tduplicated ${propName} for: ` +
          `${list.map((e) => `\n\t\t[ ${e.dn} ]`)}\n`;
        err = true;
      }
      result += err ? `${msg}\n` : '';
    });

    return result;
  }

  checkForDuplicatedGroupIds() {}

  checkUsersHomeDirectories() {}
}
