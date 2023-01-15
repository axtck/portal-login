import { IProfile } from './Settings';
import { IUser } from './User';
import { IUserProfileImage } from './UserProfileImage';

export interface IUserInfo {
  user: IUser;
  profile: IProfile;
  profileImages: IUserProfileImage[];
}
