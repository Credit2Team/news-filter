import { Component, OnInit } from '@angular/core';
import { FacadeStates } from 'src/app/classes/facade-states';
import { FilterFacadeService } from 'src/app/facades/filter-facade.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  state = FacadeStates;
  vm$ = this.facade.vm$;

  constructor(private facade: FilterFacadeService) {}

  tagToggle(tag: string, state: boolean) {
    this.facade.constructUrlFromTagSelection(tag, !state);
  }
  ngOnInit() {}
}
