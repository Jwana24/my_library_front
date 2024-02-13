export type TWatchings = {
  id?: number;
  status: string;
  producer: string;
  title: string;
  image: string;
  saga: boolean;
  summary: string;
  rating?: number;
  type: Type;
  genres: Genre[];
}

export type TReadings = {
  id?: number;
  status: string;
  author: string;
  title: string;
  image: string;
  saga: boolean;
  summary: string;
  lang: string;
  rating?: number;
  type: Type;
  genres: Genre[];
}

export type TListenings = {
  id?: number;
  status: string;
  artist: string;
  title: string;
  image: string;
  rating?: number;
  type: Type;
  genres: Genre[];
}

export type Type = {
  id?: number;
  name?: string;
  genres?: Genre[];
};

export type Genre = {
  id?: number;
  name?: string;
  type?: Type;
}