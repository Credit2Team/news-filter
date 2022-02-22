import { Component, Input, OnInit } from '@angular/core';
import { NewsCardLayout } from 'src/app/classes/layout.model';
import { NewsCard } from 'src/app/classes/news-card.mode';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  @Input() layout = NewsCardLayout.Bottom;
  @Input() data: NewsCard;
  Layout = NewsCardLayout;
  constructor() {}

  ngOnInit() {}
}
