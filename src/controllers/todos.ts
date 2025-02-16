import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
	const { text } = req.body;
	const newTodo = new Todo(Math.random().toString(), text);

	TODOS.push(newTodo);

	res.json({ message: 'Create the todo.', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
	res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
	const todoId = req.params.id;
	const { text } = req.body;

	const todo = TODOS.find((todo) => todo.id === todoId);
	if (!todo) {
		throw new Error(`Cound not find id: ${todoId}`);
	}

	todo.text = text;
	res.status(200).json({ message: 'Updated!', updateTodo: todo });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
	const todoId = req.params.id;
	const { text } = req.body;

	const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
	if (todoIndex < 0) {
		throw new Error(`Cound not find id: ${todoId}`);
	}

	TODOS.splice(todoIndex, 1);
	res.json({ message: 'Todo deleted' });
};
