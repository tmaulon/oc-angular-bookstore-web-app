import { Injectable } from '@angular/core';
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import { Subject } from 'rxjs';
import { Book } from './../../models/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  // booksItemsRefs: AngularFireList<Book> | undefined;
  // booksItems: Observable<Book[]>;

  constructor() {
    this.getBooks();
    // this.booksItemsRefs = this.db.list('books');
    // this.booksItems = this.booksItemsRefs.snapshotChanges().pipe(
    //   map((changes) =>
    //     changes.map((item) => {
    //       console.log('item : ', item);
    //       return {
    //         key: item.payload.key as string,
    //         ...(item.payload.val() as Book),
    //       };
    //     })
    //   )
    // );
  }

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    const db = getDatabase();
    const booksRef = ref(db, '/books');
    set(booksRef, this.books);
  }
  getBooks() {
    const db = getDatabase();
    const booksRef = ref(db, '/books');
    onValue(booksRef, (data: DataSnapshot) => {
      console.log('in getBooks, data : ', data);
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }
  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const bookRef = ref(db, '/books/' + id);
      onValue(
        bookRef,
        (data: DataSnapshot) => {
          resolve(data.val());
        },
        (error) => {
          reject(error);
        },
        {
          onlyOnce: true,
        }
      );
    });
  }
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookItem) => bookItem === book
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  /**
   * refactoring below
   */
  /*
  getAllBooks() {
    const db = getDatabase();
    const booksRef = query(ref(db, 'books'));
    onValue(
      booksRef,
      (snapshot) => {
        console.log('in get all books, snapshot : ', snapshot);
        this.books = snapshot.val() ? snapshot.val() : [];
        this.emitBooks();
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(
            'in get all books, childSnapshot, childKey, childData : ',
            childSnapshot,
            childKey,
            childData
          );
        });
      },
      {
        onlyOnce: true,
      }
    );
  }

  async getBook(id: number) {
    const db = getDatabase();
    const bookRef = query(ref(db, `/books/${id}`));
    onValue(
      bookRef,
      (snapshot) => {
        console.log('in get book, snapshot : ', snapshot);
        return snapshot.val();
      },
      {
        onlyOnce: true,
      }
    );
  }

  addBook(newBook: Book) {
    this.booksItemsRefs?.push(newBook);
  }

  updateBook(key: string, updatedBook: Book) {
    this.booksItemsRefs?.update(key, updatedBook);
  }

  deleteBook(key: string) {
    this.booksItemsRefs?.remove(key);
  }

  deleteAllBooks() {
    this.booksItemsRefs?.remove();
  }

  saveAllBooks() {
    this.books.map((book) => this.booksItemsRefs?.push(book));
  }
  */
}
