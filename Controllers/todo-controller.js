const data = require("../todo.json");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const createTodo = (req, res) => {
    const { title, description, completed } = req.body;

    const titles = data.map((d) => d.title);

    if (!titles.includes(title)) {
        data.push({ title, description, completed, id: uuidv4() });
        fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));

        return res.send(data);
    }

    return res.status(404).send({ message: "Todo exists" });
};

const changeStatus = (req, res) => {
    const { id } = req.body;
    const todoId = parseInt(id);
    const result_of_id = data.findIndex((d) => d.id === todoId);

    if (result_of_id === -1) {
        return res.status(404).send({ message: "Todo not found" });
    }

    data.forEach((el) => {
        if (todoId === el.id) {
            el.completed = true;
        }
    });

    fs.writeFileSync("todo.json", JSON.stringify(data, null, 2));

    const result = data.find((item) => item.id === todoId);
    res.status(200).send(result);
};

const changeDetails = (req, res) => {
    const todo = [];
    const todoID = Number(req.params.id);

    todo = data.find((element) => {
        if (req.body.title) {
            element.title = req.body.title;
        }
        if (req.body.description) {
            element.description = req.body.description;
        }
        if (req.body.completed) {
            element.completed = req.body.completed;
        }
        todo.push(element);
        res.status(200).send(todo);
    });
};

const deleteTodo = (req, res) => {
    const userId = Number(req.params.id);

    const usersData = data.filter((el) => el.id !== userId);
    if (!usersData) {
        res.status(404).send("User Not Found");
    } else {
        res.status(200).send("User successfully deleted");
        console.log(usersData);
    }
    return usersData;
};

const getAllTodos = (req, res) => {
    if (data) {
        return res.status(200).send(data);
    }
};

const getCompleted = (req, res) => {

    const todo = data.filter((el) => el.completed === true);
    if (todo) {
        res.send(todo);
    } else {
        res.send("Todo Not Found");
    }
};
module.exports = {
    createTodo,
    changeStatus,
    changeDetails,
    deleteTodo,
    getAllTodos,
    getCompleted,
};
