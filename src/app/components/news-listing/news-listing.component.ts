import { Component } from '@angular/core';
import { FacadeStates } from 'src/app/classes/facade-states';
import { NewsListingFacadeService } from 'src/app/facades/news-listing-facade.service';

@Component({
  selector: 'app-news-listing',
  templateUrl: './news-listing.component.html',
  styleUrls: ['./news-listing.component.scss'],
})
export class NewsListingComponent {
  vm$ = this.facade.vm$;
  state = FacadeStates;
  constructor(private facade: NewsListingFacadeService) {}
}
