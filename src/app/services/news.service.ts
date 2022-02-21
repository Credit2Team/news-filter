/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

interface Payload {
  ArticleTitle: string;
  Author: string;
  Date: string;
  ShortDescription: string;
  Subject: string;
  Tags: string[];
  ThumbnailImage: string;
  TimeToRead: number;
  URL: string;
  URLLabel: string;
  id: number;
}

interface News {
  articleTitle: string;
  author: string;
  date: string;
  shortDescription: string;
  subject: string;
  tags: string[];
  thumbnailImage: string;
  timeToRead: number;
  url: string;
  uRLLabel: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news$ = this.http
    .get('https://my.api.mockaroo.com/fed-exercise-data.json?key=cf334d90')
    .pipe(
      map((payload: Payload[]) => this.adaptPayload(payload)),
      share()
    );

  tags$ = this.news$.pipe(map((news) => this.getTagsFromNews(news)));

  constructor(private http: HttpClient) {
    this.tags$.subscribe((news) => console.log(news));
    this.news$.subscribe((news) => console.log(news));
  }

  private adaptPayload(payload: Payload[]): News[] {
    if (payload == null) {
      return [];
    }
    const news: News[] = payload.map((data) => {
      const {
        ArticleTitle,
        Author,
        Date,
        ShortDescription,
        Subject,
        Tags,
        ThumbnailImage,
        TimeToRead,
        URL,
        URLLabel,
        id,
      } = data;

      return {
        articleTitle: ArticleTitle,
        author: Author,
        date: Date,
        shortDescription: ShortDescription,
        subject: Subject,
        tags: Tags,
        thumbnailImage: ThumbnailImage,
        timeToRead: TimeToRead,
        url: URL,
        uRLLabel: URLLabel,
        id,
      };
    });
    return news;
  }

  private getTagsFromNews(newsArray: News[]): string[] {
    if (newsArray == null) {
      return [];
    }
    const results = newsArray.reduce(
      (allTags: string[], news: News): string[] => {
        const tags = news.tags;
        const uniqueTags = tags.filter((tag) => !allTags.includes(tag));
        return allTags.concat(uniqueTags);
      },
      []
    );
    return results;
  }
}
