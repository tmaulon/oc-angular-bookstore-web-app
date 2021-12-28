import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from './../../../services/book/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookFormGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      resume: '',
    });
  }

  onSaveBook() {
    const title = this.bookFormGroup.get('title')?.value;
    const author = this.bookFormGroup.get('author')?.value;
    const resume = this.bookFormGroup.get('resume')?.value;
    const newBook = new Book(title, author);
    newBook.resume = resume;
    this.bookService.createNewBook(newBook);
    this.router.navigate([`/books`]);
  }
}
