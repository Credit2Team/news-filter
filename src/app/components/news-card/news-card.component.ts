import { Component, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { defer, from } from 'rxjs';
import { NewsCardLayout } from 'src/app/classes/layout.model';
import { NewsCard } from 'src/app/classes/news-card.mode';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  @Input() layout = NewsCardLayout.Bottom;
  @Input() data: NewsCard;
  Layout = NewsCardLayout;
  isMobile = this.platform.is('mobile');
  constructor(private platform: Platform) {}
}
