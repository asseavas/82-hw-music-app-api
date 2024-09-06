export interface ArtistMutation {
  name: string;
  image: string | null;
  information: string | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  releaseYear: string;
  image: string | null;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}
