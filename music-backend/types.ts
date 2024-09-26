import { Model, Types } from 'mongoose';

export interface ArtistMutation {
  user: Types.ObjectId;
  name: string;
  image: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface AlbumMutation {
  artist: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: boolean;
}

export interface TrackMutation {
  album: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryMutation {
  artist: Types.ObjectId;
  track: Types.ObjectId;
  user: Types.ObjectId;
  datetime: Date;
}
