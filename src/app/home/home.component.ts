import { Component, OnInit } from '@angular/core';
import axios, { AxiosError } from 'axios';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
htmlData:any;

  constructor() { }

  ngOnInit(): void {
/*
    this.htmlData=this.FetchPage("https://www.codingame.com/profile/87d78b40758ce6fafda74f50afe159fa0702984")
    console.log(this.htmlData)
  }

  FetchPage(url: string): Promise<string | undefined> {
    const HTMLData = axios
      .get(url)
      .then(res => res.data)
      .catch((error: AxiosError) => {
        console.error(`There was an error with ${error.config.url}.`);
        console.error(error.toJSON());
      });

    return HTMLData;
    */
  }

}
