import { LDIFService } from './../../services/ldif.service';
import { ValidationService } from './../../services/validation.service';
import { ILDAPEntry } from 'src/app/models/LDAPEntity.model';
import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { EXAMPLE_LDIF_SCHEMA } from 'src/assets/app-example-data';
import { DATA_TYPES, ENTITY_TYPES } from 'src/app/models/LDAPTypes.enum';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  ldifSchemaRawInput = '';
  entities: ILDAPEntry[] = [];
  entries: ILDAPEntry[] = [];
  validationResults = '';




  allDNsDEPR: string[] = [];

  constructor(
    private appService: AppService,
    private validationService: ValidationService,
    private ldifService: LDIFService,
  ) {
    this.ldifSchemaRawInput = appService.ldifSchemaRawInput;
  }

  ngOnInit(): void {
    this.appService.validateSchema();
    this.validationResults = this.appService.validationResults;
  }

  ValidateSchema() {
    this.validationResults =  this.appService.validateSchema();
  }

  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////




  createSummary(entities: ILDAPEntry[]) {
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


  checkGroupsOfNamesForMissingMembers() {
    let result = '';

    this.entities
      .filter((e) => e.type === ENTITY_TYPES.GROUP_OF_NAMES)
      .forEach((entity) => {
        let err = false;
        let msg = `ERR: in GroupOfNames [ dn: ${entity.dn} ]\n`;

        entity.member?.forEach((m) => {
          if (!this.allDNsDEPR.some((dn) => dn === m)) {
            msg += `\tmember doesnt exist: ${m}\n`;
            err = true;
          }
        });

        result += err ? msg + '\n' : '';
      });

    return result;
  }

  checkForDuplicatedUserIds() {
    let entities = this.entities.filter((e) => e.type === ENTITY_TYPES.USER);
    return this.ldifService.checkForDuplicatedEntitiesByPropName(
      entities,
      'uidnumber'
    );
  }

  checkForDuplicatedGroupIds() {
    let entities = this.entities.filter((e) => e.type === ENTITY_TYPES.GROUP);
    return this.ldifService.checkForDuplicatedEntitiesByPropName(
      entities,
      'gidnumber'
    );
  }

  checkGroupsForMissingMemberUids() {}

  checkUsersHomeDirectories() {
    let result = '';

    this.entities
      .filter((e) => e.type === ENTITY_TYPES.USER)
      .forEach((entity) => {
        let err = false;
        let msg = `ERR: in User [ dn: ${entity.dn} ]\n`;

        // if (entity.homedirectory?.split('/').last) {

        // }
        // let properHomeDir=

        // entity.homedirectory?.forEach((m) => {
        //   if (!this.allDNs.some((dn) => dn === m)) {
        //     msg += `\tmember doesnt exist: ${m}\n`;
        //     err = true;
        //   }
        // });

        result += err ? msg + '\n' : '';
      });

    return result;
  }
}
