import { Controller, Delete, Get } from '@nestjs/common';

import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.populateDatabase();
  }

  @Delete()
  executeDrop() {
    return this.seedService.dropDatabase();
  }
}
