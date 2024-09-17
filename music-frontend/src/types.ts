export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string | null;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
  };
  title: string;
  releaseYear: number;
  image: string | null;
}

export interface AlbumTrack {
  _id: string;
  number: number;
  title: string;
  duration: string;
}

export interface AlbumInfo {
  artist: Artist;
  albumName: string;
  releaseYear: number;
  tracks: AlbumTrack[];
  tracksNumber: number;
  image: string | null;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
