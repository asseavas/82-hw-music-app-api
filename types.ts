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
