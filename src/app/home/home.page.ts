import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor, Plugins } from '@capacitor/core';
import { IonSearchbar, NavController } from '@ionic/angular';

import { SearchResult } from '../interfaces/api.model';
import { MemeApiService } from '../services/meme-api/meme-api.service';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /** search term */
  public searchTerm: string;
  /** Search results */
  public searchResult: Promise<SearchResult>;
  /** loading indicator */
  public isLoading = false;
  /** Filter params */
  public filterParams: { text: string };

  @ViewChild(IonSearchbar, { static: true }) searchbar: IonSearchbar;

  constructor(
    private memeApi: MemeApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.activatedRoute.queryParamMap.subscribe((paramMap) => {
      // create search params based on route query params
      const newParams = {
        text: paramMap.get('text'),
      };

      // prevent realoding data if filter has not changed
      if (JSON.stringify(newParams) !== JSON.stringify(this.filterParams)) {
        this.filterParams = newParams;
        // run search only if text is not empty
        if (this.filterParams.text && this.filterParams.text.trim() !== '') {
          this.isLoading = true;
          this.searchResult = this.memeApi.search(this.filterParams.text);
          this.searchResult.finally(() => (this.isLoading = false));
        }
      }
    });
  }

  searchMeme() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        text: this.searchTerm,
      },
      queryParamsHandling: 'merge',
    });
  }

  openDetails(path: string) {
    this.navCtrl.navigateForward(['details', path]);
  }

  async closeKeyboard() {
    // remove focus from search input
    const inputEl = await this.searchbar.getInputElement();
    inputEl.blur();

    // hide keyboard
    if (Capacitor.isPluginAvailable('Keyboard')) {
      Keyboard.hide();
    }
  }
}
