import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':term')
  update(
    @Param('term', ParseObjectIdPipe) id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':term')
  remove(@Param('term', ParseObjectIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
