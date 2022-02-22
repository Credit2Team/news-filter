import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { NewsListingComponent } from 'src/app/components/news-listing/news-listing.component';
import { AreAllTagsEnabledPipe } from 'src/app/pipes/are-all-tags-enabled.pipe';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';
import { NewsCardTextComponent } from 'src/app/components/news-card-text/news-card-text.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NewsPageRoutingModule],
  declarations: [
    NewsPage,
    NewsListingComponent,
    NewsCardComponent,
    NewsCardTextComponent,
    FilterComponent,
    AreAllTagsEnabledPipe,
  ],
})
export class NewsPageModule {}
