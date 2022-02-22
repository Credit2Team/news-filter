import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../classes/tag.model';

@Pipe({
  name: 'areAllTagsEnabled',
})
export class AreAllTagsEnabledPipe implements PipeTransform {
  transform(tags: Tag[]): boolean {
    return !tags.map(({ checked }) => checked).includes(false);
  }
}
