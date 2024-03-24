import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateRawInput(ldifSchemaRawInput: string): string {
    return ldifSchemaRawInput.replaceAll('\n ', '');
  }
}