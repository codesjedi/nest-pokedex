import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import { PokeResponse } from './seed.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  private POKEMON_URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  async populateDatabase() {
    const { data } = await this.axios.get<PokeResponse>(
      this.POKEMON_URL_ENDPOINT,
    );
    return data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return {
        name,
        no,
      };
    });
  }
}
