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
  fileIsUploading: boolean = false;
  fileUrl: string = '';
  fileUploaded: boolean = false;

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
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.picture = this.fileUrl;
    }
    this.bookService.createNewBook(newBook);
    this.router.navigate([`/books`]);
  }

  async onUploadFile(file: File) {
    this.fileIsUploading = true;
    const uploadedFileUrl = (await this.bookService.uploadFile(file)) as string;
    if (uploadedFileUrl) {
      this.fileUrl = uploadedFileUrl;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  }

  detectFiles(event: Event) {
    if (
      !(event.currentTarget as HTMLInputElement).files ||
      (event.currentTarget as HTMLInputElement).files === null ||
      !(event.currentTarget as HTMLInputElement).files?.length
    )
      return;
    const files = (event.currentTarget as HTMLInputElement).files;

    if (!files || files === null || !files.length) return;
    const file = files[0];
    this.onUploadFile(file);
  }
}
