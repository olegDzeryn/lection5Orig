import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../../film';
import { SortOption } from '../../sort-option';
import { FilmItemComponent } from '../film-item/film-item.component';

@Component({
  selector: '.films',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmsData: Film[];
  sortOption: any;
  counter: number = 0;
  favoriteFilmsCount: number = 0;

  sortOptions: SortOption[] = [
    { value: 1, description: 'По алфавиту: A-Z' },
    { value: -1, description: 'По алфавиту: Z-A' }
  ];

  // Получаем доступ к дочернему компоненту напрямую используя ViewChild
  @ViewChild(FilmItemComponent) filmItem: FilmItemComponent;

  // Получаем доступ к списку дочерних компонентов напрямую используя ViewChildred
  @ViewChildren(FilmItemComponent) films: QueryList<FilmItemComponent>;


  constructor(public filmsService: FilmService) {
  }

  ngAfterViewInit() {
    console.log("Hook Parent, Все дочерние компоненты отрендерены");
  }

  directUpdateChildren() {
    console.log("вызываем логику дочернего компонента напрямую");
    let result = this.filmItem.showFilmInfo();
    console.log(result);
  }

  directUpdateAllChildren() {
    console.log("вызываем логику в каждом дочернем компоненте")
    this.films.forEach(item => {
      item.showFilmInfo();
    });
  }

  count() {
    this.counter++;
  }

  ngOnInit() {
    console.log("Hook Parent, Инициализация родительского компонента")
    this.filmsData = this.filmsService.getFilms();
    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        console.log(filmList);
        console.log(`${this.filmsService.midImgPath}${filmList.results[2].poster_path}`)
      },
      err => {
        console.log("error");
      })
  }

  sortFilms(arr: Film[], numDirect: number): Film[] {
    return arr.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) { return -1 * numDirect; }
      if (x > y) { return numDirect; }
      return 0;
    })
  }

  sortFilmCards() {
    this.filmsData = (this.sortOption === "default")
      ? this.filmsService.getFilms()
      : this.sortFilms(this.filmsData, this.sortOption);
  }

  makeStar(film: Film) {
    film.isFavorite = !film.isFavorite;
    let favoriteFilms = this.filmsData.filter(item => item.isFavorite);
    this.favoriteFilmsCount = favoriteFilms.length;

  }
}
