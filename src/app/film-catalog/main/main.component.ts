import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  //styles: [`h2 {color: red;}`, ``]
})
export class MainComponent implements OnInit {
  pageName: string = "Film Catalog Dashboard";

  isRed: boolean = true;
  website: {} = {url: 'http://google.com', title: "Google Site"}

  constructor() { }

  ngOnInit() { }

}
