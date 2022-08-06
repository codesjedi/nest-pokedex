import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './seed.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  private POKEMON_URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async populateDatabase() {
    const { data } = await this.axios.get<PokeResponse>(
      this.POKEMON_URL_ENDPOINT,
    );

    const pokemonsToInsert = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return {
      message: 'seed executed succesfully.',
    };
  }
  async dropDatabase() {
    await this.pokemonModel.deleteMany({});
    return {
      message: 'drop executed successfully.',
    };
  }
}
