import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const pokemonSanitized = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.PokemonModel.create({
        ...createPokemonDto,
        name: pokemonSanitized,
      });
      return pokemon;
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists in db`);
      }
    }
  }

  async findAll() {
    try {
      const pokemons = await this.PokemonModel.find();
      return pokemons;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.PokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term.trim())) {
      pokemon = await this.PokemonModel.findById(term.trim());
    }

    if (!pokemon) {
      pokemon = await this.PokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or number  "${term}" not found.`,
      );
    }

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.PokemonModel.findByIdAndUpdate(
      id,
      updatePokemonDto,
    );
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return {
      _id: pokemon.id,
      ...updatePokemonDto,
    };
  }
  async remove(id: string) {
    const { deletedCount } = await this.PokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return {
      message: `Pokemon with id ${id} removed succesfully.`,
    };
  }
}
