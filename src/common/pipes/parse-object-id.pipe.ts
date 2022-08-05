import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    return id;
  }
}
