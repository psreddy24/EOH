import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/person.model';

export interface IEmployee {
  id?: number;
  employeeNumber?: string;
  employedDate?: Moment;
  terminatedDate?: Moment;
  person?: IPerson;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public employeeNumber?: string,
    public employedDate?: Moment,
    public terminatedDate?: Moment,
    public person?: IPerson
  ) {}
}
