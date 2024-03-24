export interface IKeyValues {
  key: string;
  values: string[];
}

export class KeyValues implements IKeyValues {
  key = '';
  values = [];
}
