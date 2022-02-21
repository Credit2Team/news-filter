import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { map, startWith, take, takeLast } from 'rxjs/operators';
import { FacadeStates } from '../classes/facade-states';
import { NewsService } from '../services/news.service';

interface Tag {
  tag: string;
  checked: boolean;
}

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
  private selectedTags$ = this.route.queryParamMap.pipe(
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
    private location: Location,
    private router: Router
  ) {}

  private constructViewModel(
    allTags: string[],
    selectedTags: string[]
  ): FilterViewModel {
    console.log('constructing vm');
    console.log('all tags', allTags);
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

  async constructUrlFromTagSelection(
    selectedTag: string,
    selectedState: boolean
  ) {
    console.log('constructUrlFromTagSelection');

    const currentSelection = this.tagSelection.map(({ tag, checked }) => {
      return { tag, checked: tag === selectedTag ? selectedState : checked };
    });
    console.log(currentSelection);
    const url = currentSelection.reduce(
      (currentUrl: string, currentTag: Tag): string => {
        return currentTag.checked
          ? `${currentUrl}&filter=${currentTag.tag}`
          : currentUrl;
      },
      ''
    );
    console.log(url);
    // this.location.replaceState(`/news/${url}`);
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
