const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

const todoListSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const listSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [todoListSchema]
});

const TodoList = mongoose.model("Todo", todoListSchema);

const List = mongoose.model("List", listSchema);

app.get('/', (req, res) => {

    TodoList.find({}, (err, data) => {
        res.render("index", {
            listTitle: "Today",
            todoValue: data
        });
    });
});

app.post('/', (req, res) => {

    const userTodo = req.body.todoInput;
    const listTitle = req.body.submit;

    if (userTodo !== "" || userTodo !== undefined) {
        const todoName = new TodoList({
            name: userTodo
        });

        if (listTitle === "Today") {
            todoName.save();
            res.redirect('/');
        } else {
            List.findOne({ name: listTitle }, (err, data) => {
                data.items.push({ name: userTodo });
                data.save();
                res.redirect("/" + listTitle);
            });
        }
    }
});

app.get('/delete', (req, res) => {
    res.redirect("/");
});

app.post('/delete', (req, res) => {
    const checkedTodo = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        TodoList.findByIdAndRemove(checkedTodo, err => {
            if (err) console.error(err);
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedTodo } } }, (err, data) => {
            if (!err) {
                res.redirect("/" + listName);
            } else console.error("Error in removing from custom list: " + err);
        })
    }
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, (err, data) => {
        if (!err) {
            if (!data) {
                const list = new List({
                    name: customListName
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                res.render("index", { listTitle: data.name, todoValue: data.items });
            }
        }
    });
});

app.listen(3000, () => {
    console.log(`Server starting at http://127.0.0.1:3000`);
});
