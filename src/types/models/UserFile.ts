import { Id } from '../types';
import { IFile } from './File';

export interface IUserFile extends IFile {
  userId: Id;
}
