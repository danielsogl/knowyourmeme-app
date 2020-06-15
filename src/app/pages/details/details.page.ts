import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeApiService } from 'src/app/services/meme-api/meme-api.service';
import { Meme } from 'src/app/interfaces/api.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private path: string;
  public meme: Meme;

  constructor(
    private activatedRoute: ActivatedRoute,
    private memeApi: MemeApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.path = paramMap.get('path');
      if (this.path) {
        this.loadDetails();
      }
    });
  }

  async loadDetails() {
    this.meme = await this.memeApi.details(this.path);
  }
}
