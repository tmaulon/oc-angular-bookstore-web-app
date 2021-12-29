import { Injectable } from '@angular/core';
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from 'firebase/storage';
import { Subject } from 'rxjs';
import { Book } from './../../models/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
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
      console.log('in getBooks, data, data.val() : ', data, data.val());
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
    if (book.picture) {
      const storage = getStorage();
      const pictureStorageRef = storageRef(storage, book.picture);
      deleteObject(pictureStorageRef).then(
        () => console.log('Photo supprimée !'),
        (error) =>
          console.error(
            "Une erreur est survenue lors de la suppression de l'image... Erreur : ",
            error
          )
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookItem) => bookItem === book
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  /**
   * Firebase Documentation
   * @url : https://firebase.google.com/docs/storage/web/upload-files
   * @param file
   */
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const storage = getStorage();
      const pictureStorageRef = storageRef(
        storage,
        'images/' + almostUniqueFileName + file.name
      );

      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(pictureStorageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(
            'Le chargement est ' + progress + '% terminé...',
            snapshot
          );
          switch (snapshot.state) {
            case 'paused':
              console.log('Les chargement est arrété !');
              break;
            case 'running':
              console.log('Le chargement est en cours...');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Le chargement a échoué ! Erreur : ', error);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Le fichier est disponible à l'url : ", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
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
  */
}
