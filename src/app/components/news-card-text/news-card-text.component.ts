import { Component, Input, OnInit } from '@angular/core';
import { NewsCard } from 'src/app/classes/news-card.mode';

@Component({
  selector: 'app-news-card-text',
  templateUrl: './news-card-text.component.html',
  styleUrls: ['./news-card-text.component.scss'],
})
export class NewsCardTextComponent implements OnInit {
  @Input() data: NewsCard;
  constructor() {}

  ngOnInit() {}
}
