export interface Artist {
  _id: string;
  user: string;
  name: string;
  image: string | null;
  information: string | null;
  isPublished: boolean;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
  };
  user: string;
  title: string;
  releaseYear: number;
  image: string | null;
  isPublished: boolean;
}

export interface AlbumTrack {
  _id: string;
  user: string;
  number: number;
  title: string;
  duration: string;
  isPublished: boolean;
}

export interface AlbumInfo {
  artist: Artist;
  albumName: string;
  releaseYear: number;
  tracks: AlbumTrack[];
  tracksNumber: number;
  image: string | null;
}

export interface ArtistMutation {
  name: string;
  image: File | null;
  information: string | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  releaseYear: string;
  image: File | null;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
}

export interface TrackHistoryMutation {
  track: string;
}

export interface HistoryTrackArtistName {
  _id: string;
  name: string;
}

export interface HistoryTrackTitle {
  _id: string;
  title: string;
}

export interface HistoryTrack {
  _id: string;
  artist: HistoryTrackArtistName;
  title: HistoryTrackTitle;
  datetime: string;
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
  role: string;
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
