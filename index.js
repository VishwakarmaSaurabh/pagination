const pagination = document.getElementById("pagination");

let currPage = 1;
const limitOfData = 5;
let startIndex = limitOfData * (currPage - 1);
let endIndex = limitOfData + startIndex;

// ChangePage(page)
const changePage = (page) => {
  currPage = page;
  startIndex = limitOfData * (currPage - 1);
  endIndex = limitOfData + startIndex;
  paginate(startIndex, endIndex);
};

const paginate = (startIndex, endIndex) => {
  fetch("books.json")
    .then((res) => res.json())
    .then((library) => {
      // console.log(library.books.slice(startIndex, endIndex));
      const dataOnPage = library.books.slice(startIndex, endIndex);
      const resultDOM = dataOnPage.map((book) => {
        let index = library.books.findIndex((b) => b.name === book.name);
        return `
            <tr>
              <th scope="row">${index + 1}</th>
              <td>${book.name}</td>
              <td>${book.author}</td>
              <td><span style="font-weight:bold">&#8377;</span> ${
                book.price
              }</td>
            </tr>
    `;
      });

      document.getElementById("results").innerHTML = resultDOM.join("");

      // Load pagination buttons
      const numberOfData = library.books.length;
      const numberOfTotalPages = Math.ceil(numberOfData / limitOfData);
      const pages = [];
      for (let i = 1; i <= numberOfTotalPages; i++) {
        pages.push(i);
      }
      const paginationDOM = pages.map(
        (page) =>
          `
        <li class="page-item" onclick="changePage(${page})"><a class="page-link" href="#">${page}</a></li>
      `
      );

      pagination.innerHTML = paginationDOM.join("");
    });
};

paginate(startIndex, endIndex);
