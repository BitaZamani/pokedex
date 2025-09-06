type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
type Sprites = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};
export type Stats = {
  base_stat: number;
  stat: { name: string };
};
export type Types = {
  slot: number;
  type: { name: PokemonType };
};
export type Abilities = {
  slot: number;
  ability: { name: string };
};
export type Details = {
  name: string;
  id: number;
  sprites: Sprites;
  stats: Stats[];
  height: number;
  weight: number;
  types: Types[];
  abilities: Abilities[];
};
export type Results = {
  name: string;
  url: string;
};
export type ColorsProps = {
  types?: Types[];
  name?: PokemonType;
};
export type CardProps = {
  name: string;
  id: number;
  image: string;
  types: Types[];
};

export type PaginationProps = {
    fetchData: (prop: string) => void;
    next: null | string;
    prev: null | string;
    pages: number;
    page: number;
  };