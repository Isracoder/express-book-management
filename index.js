import express from "express";
import data from "Sample_data.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const filteredItems = data.slice((page - 1) * pageSize, page * pageSize);
    res.send({
        page, pageSize,
        total: data.length,
        filteredItems
    });
});
app.get('/:id', (req, res) => {
    console.log((`id ${req.params.id}`));
    let obj = {};
    data.forEach(book => {
        if (book.id === parseInt(req.params.id))
            obj = book;
    });
    if (Object.keys(obj).length != 0)
        res.send(obj);
    else
        res.status(404).send("The id you requested wasn't found");
});
app.post('/newBook', (req, res) => {
    console.log(req.body);
    const newBook = req.body;
    newBook.id = data.length + 1;
    if (!newBook.author || !newBook.title || !newBook.publicationYear) {
        res.status(204).send("Failed! You need to provide a valid author , title , and publicationYear");
    }
    data.unshift(newBook);
    res.send("Thanks, New book added!");
});
app.put('/updateBook/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === bookId) {
            data[i] = { ...data[i], ...req.body };
            res.send("Successfully updated book!");
            return;
        }
    }
    res.status(404).send("Book Id not found , Failed to update book!");
});
app.delete('/book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (bookId == undefined)
        res.send("please send book id");
    let found = data.findIndex((book) => book.id === bookId);
    if (found >= 0) {
        data.splice(found, 1);
        res.send("Successfully Deleted Book!");
        return;
    }
    else {
        res.status(404).send("Error: Book Not found!");
    }
});
app.get('/bookByName/:bookName', (req, res) => {
    let arrOfBooks = [];
    let name = req.params.bookName.toString().trim().toLowerCase();
    console.log(`name ${name}`);
    data.forEach(book => {
        if (book.title.toLowerCase().trim() === name)
            arrOfBooks.push(book);
    });
    if (arrOfBooks.length == 0)
        res.status(404).send("Sorry no books by that name");
    res.send(arrOfBooks);
});
app.get('/bookByYear/:bookYear', (req, res) => {
    let arrOfBooks = [];
    let year = parseInt(req.params.bookYear);
    console.log(`year ${year}`);
    data.forEach(book => {
        if (book.publicationYear === year)
            arrOfBooks.push(book);
    });
    if (arrOfBooks.length == 0)
        res.status(404).send("Sorry no books published that year");
    res.send(arrOfBooks);
});
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`);
});
