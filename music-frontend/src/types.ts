export interface Artist {
  _id: string;
  name: string;
  image: string | null;
  information: string | null;
}

export interface Album {
  _id: string;
  artist: string;
  title: string;
  releaseYear: number;
  image: string | null;
}
