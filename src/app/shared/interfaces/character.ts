export interface CharacterInterface {
  info: CharacterInfoInterface;
  results: CharacterResultInterface[];
}

export interface CharacterInfoInterface {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface CharacterResultInterface {
  id: number
  name: string
  gender: string
  species: string
  status: string
  image: string
  favorite: boolean
}
