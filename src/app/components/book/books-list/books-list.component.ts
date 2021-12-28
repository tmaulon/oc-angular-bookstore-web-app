import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from './../../../services/book/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  booksSubscription: Subscription = new Subscription();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.booksSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => (this.books = books)
    );
    this.bookService.emitBooks();
  }

  onNewbook() {
    this.router.navigate([`/books`, `new`]);
  }

  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate([`/books`, `view`, id]);
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
