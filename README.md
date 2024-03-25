# LDAPSchemaValidator
gets exported schema as LDIF format and checks if all is ok, then showc report with points where is some inconsistency/errors

### raw input - exported from LDAP
- [ ] entries delimited by double newline `\n\n`
- [ ] entries recognized by contains `dn: `

### it perfroms checks:
- [ ] for USER:
  - checkForDuplicated_dns
  - checkForDuplicated_cns
  - checkForDuplicated_uids
  - checkForDuplicated_uidnumbers
  - checkForMissingGroup
  - checkForHomedirectory
- [ ] for GROUP:
  - checkForDuplicated_dns
  - checkForDuplicated_gidnumbers
  - checkGroupsForMissingMembers
- [ ] for GROUP_OF_NAMES:
  - checkForDuplicated_dns
  - checkGroupsOfNamesForMissingMembers
- [ ] for ORGANIZATIONAL_UNIT:
  - checkForDuplicated_dns
- [ ] for the rest:
  - checkForDuplicated_dns







This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
