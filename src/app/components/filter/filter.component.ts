import { Component } from '@angular/core';
import { FacadeStates } from 'src/app/classes/facade-states';
import { FilterFacadeService } from 'src/app/facades/filter-facade.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  state = FacadeStates;
  vm$ = this.facade.vm$;

  constructor(private facade: FilterFacadeService) {}

  async tagToggle(tag: string, state: boolean) {
    await this.facade.toggleOneTag(tag, !state);
  }

  async enableAllTags() {
    await this.facade.toggleAllTags(true);
  }

  async disableAllTags() {
    await this.facade.toggleAllTags(false);
  }
}
