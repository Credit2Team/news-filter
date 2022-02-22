import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacadeStates } from '../classes/facade-states';
import { News } from '../classes/news.model';
import { NewsService } from '../services/news.service';
import { FilterFacadeService } from './filter-facade.service';

interface NewsCard {
  articleTitle: string;
  author: string;
  date: string;
  subject: string;
  tags: string[];
  thumbnailImage: string;
  url: string;
  id: number;
}

interface NewsViewModel {
  state: FacadeStates;
  message: string;
  data: NewsCard[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsListingFacadeService {
  newsCards$: Observable<NewsCard[]> = this.newsService.news$.pipe(
    map((news) => this.adaptNewsToCard(news))
  );
  vm$ = combineLatest([this.filterFacade.selectedTags$, this.newsCards$]).pipe(
    map(([selectedTags, cards]) => this.filterNewsCards(selectedTags, cards)),
    map((cards) => this.constructViewModel(cards))
  );

  constructor(
    private filterFacade: FilterFacadeService,
    private newsService: NewsService
  ) {}

  private adaptNewsToCard(news: News[]): NewsCard[] {
    const cards: NewsCard[] = news.map((data) => {
      const {
        articleTitle,
        author,
        date,
        subject,
        tags,
        thumbnailImage,
        url,
        id,
      } = data;

      return {
        articleTitle,
        author,
        date,
        subject,
        tags,
        thumbnailImage,
        url,
        id,
      };
    });
    return cards;
  }

  private filterNewsCards(
    selectedTags: string[],
    cards: NewsCard[]
  ): NewsCard[] {
    const filteredCards: NewsCard[] = cards.filter((card) =>
      selectedTags.find((tag) => card.tags.includes(tag))
    );
    return filteredCards;
  }

  private constructViewModel(news: NewsCard[]): NewsViewModel {
    return {
      state: FacadeStates.Complete,
      message: '',
      data: news,
    };
  }
}
