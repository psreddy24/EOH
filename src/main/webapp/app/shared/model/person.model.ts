import { Moment } from 'moment';

export interface IPerson {
  id?: number;
  lastName?: string;
  firstname?: string;
  birthDate?: Moment;
}

export class Person implements IPerson {
  constructor(public id?: number, public lastName?: string, public firstname?: string, public birthDate?: Moment) {}
}
