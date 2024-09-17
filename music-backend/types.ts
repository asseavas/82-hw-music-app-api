import { Model } from 'mongoose';

export interface ArtistMutation {
  name: string;
  image: string | null;
  information: string | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
  number: number;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryFields {
  user: string;
  track: string;
  datetime: Date;
}
