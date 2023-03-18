import '../css/style.css';
import { getJSON } from './utils/getJSON';

let books,
  chosenCategoryFilter = 'all',
  chosenSortOption,
  categories = [];

async function start() {
  books = await getJSON('/json/books.json');
  getCategories();
  addFilters();
  addSortingOptions();
  sortByTitle(books);
  displayBooks();
}

function sortByTitleAsending(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1);
}

function sortByTitleDesending(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle < bTitle ? 1 : -1);
}

function sortByPriceAscending(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1);
}

function sortByPriceDescending(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice < bPrice ? 1 : -1);
}

function sortByAuthorAscending(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1);
}

function sortByAuthorDescending(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor < bAuthor ? 1 : -1);
}

function addSortingOptions() {
  // create and display html
  document.querySelector('.sortingOptions').innerHTML = /*html*/`
    <label><span>Sort by:</span>
      <select class="sortOption">
        <option>Title Ascending</option>
        <option>Title Descending</option>
        <option>Price Ascending</option>
        <option>Price Descending</option>
        <option>Author Ascending</option>
        <option>Author Descending</option>
      </select>
    </label>
  `;
  // add an event listener
  document.querySelector('.sortOption').addEventListener('change', event => {
    chosenSortOption = event.target.value;
    displayBooks();
  });
}

function getCategories() {
  // create an array of all book categories
  let withDuplicates = books.map(book => book.category);
  // remove duplicates by creating a set
  // that we then spread into an array to cast it to an array
  categories = [...new Set(withDuplicates)];
  // sort the categories 
  categories.sort();
}

function addFilters() {
  // create and display html
  document.querySelector('.filters').innerHTML = /*html*/`
    <label><span>Filter by categories:</span>
      <select class="categoryFilter">
        <option>all</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </label>
  `;
  // add an event listener
  document.querySelector('.categoryFilter').addEventListener(
    'change',
    event => {
      // get the selected category
      chosenCategoryFilter = event.target.value;
      displayBooks();
    }
  );
}

function displayBooks() {
  // filter according to category and call displayBooks
  let filteredBooks = books.filter(
    ({ category }) => chosenCategoryFilter === 'all'
      || chosenCategoryFilter === category
  );
  if (chosenSortOption === 'Title Ascending') { sortByTitleAsending(filteredBooks); }
  if (chosenSortOption === 'Title Descending') { sortByTitleDesending(filteredBooks); }
  if (chosenSortOption === 'Price Ascending') { sortByPriceAscending(filteredBooks); }
  if (chosenSortOption === 'Price Descending') { sortByPriceDescending(filteredBooks); }
  if (chosenSortOption === 'Author Ascending') { sortByAuthorAscending(filteredBooks); }
  if (chosenSortOption === 'Author Descending') { sortByAuthorDescending(filteredBooks); }
  let htmlArray = filteredBooks.map(({
    id, title, author, description, category, price
  }) => /*html*/`
    <div class="book">
      <h3>${author}</h3>
      <p><span>id</span>${id}</p>
      <p><span>title</span>${title}</p>
      <p><span>description</span>${description}</p>
      <p><span>category</span>${category}</p>
      <p><span>price</span>${price}</p>
    </div>
  `);
  document.querySelector('.bookList').innerHTML = htmlArray.join('');
}

start();