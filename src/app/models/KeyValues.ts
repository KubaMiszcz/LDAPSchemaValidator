export interface IKeyValues {
  key: string;
  values: string[];
}

export class KeyValues implements IKeyValues {
  key = '';
  values = [];
}

export interface IKeyValue<T1> {
  key: string;
  value: T1;
}

