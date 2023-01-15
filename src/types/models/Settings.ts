import { Id, Null } from '../types';

export interface IProfile {
  userId: Id;
  firstName: Null<string>;
  lastName: Null<string>;
  dateOfBirth: Null<Date>;
  shouldDisplayUsername: boolean;
}
