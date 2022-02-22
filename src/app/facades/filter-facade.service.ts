import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';
import { FacadeStates } from '../classes/facade-states';
import { Tag } from '../classes/tag.model';
import { NewsService } from '../services/news.service';

interface FilterViewModel {
  state: FacadeStates;
  message: string;
  data: Tag[];
}

@Injectable({
  providedIn: 'root',
})
export class FilterFacadeService {
  private tagSelection: Tag[];
  selectedTags$ = this.route.queryParamMap.pipe(
    map((params) => this.parseQueryParam(params))
  );

  vm$: Observable<FilterViewModel> = combineLatest([
    this.newsService.tags$,
    this.selectedTags$,
  ]).pipe(
    map(([allTags, selectedTags]) =>
      this.constructViewModel(allTags, selectedTags)
    ),
    startWith({
      state: FacadeStates.Loading,
      message: 'Fetching',
      data: undefined,
    }),
    share()
  );
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private constructViewModel(
    allTags: string[],
    selectedTags: string[]
  ): FilterViewModel {
    this.tagSelection = allTags.map((tag) => {
      return {
        tag,
        checked: selectedTags.includes(tag),
      };
    });
    return {
      state: FacadeStates.Ongoing,
      message: '',
      data: this.tagSelection,
    };
  }

  private parseQueryParam(params: ParamMap): string[] {
    return params.getAll('filter');
  }

  async toggleOneTag(selectedTag: string, selectedState: boolean) {
    const currentSelection = this.tagSelection.map(({ tag, checked }) => {
      return { tag, checked: tag === selectedTag ? selectedState : checked };
    });
    await this.constructUrlFromTagSelection(currentSelection);
  }

  async toggleAllTags(isEnable: boolean) {
    const currentSelection = this.tagSelection.map(({ tag }) => {
      return { tag, checked: isEnable };
    });
    await this.constructUrlFromTagSelection(currentSelection);
  }

  async constructUrlFromTagSelection(currentSelection: Tag[]) {
    const options = {
      queryParams: {
        filter: currentSelection
          .filter(({ checked }) => checked)
          .map(({ tag }) => tag),
      },
    };
    this.router.navigate(['/news'], options);
  }
}
