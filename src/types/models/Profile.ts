import { Id, Null } from '../types';

export interface IProfile {
  id: Id;
  userId: Id;
  firstName: Null<string>;
  lastName: Null<string>;
  dateOfBirth: Null<Date>;
}
