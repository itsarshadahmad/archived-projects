package com.example.bittodo.repository

import android.content.Context
import androidx.lifecycle.LiveData
import com.example.bittodo.db.Todo
import com.example.bittodo.db.TodoDB
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class TodoRepository(context: Context) {
    private var db: TodoDB = TodoDB.getDatabase(context)

    fun getAllTodo(): LiveData<List<Todo>> {
        return db.todoDao().getAllTodo()
    }

    fun deleteTodo(item: Todo) {
        CoroutineScope(Dispatchers.IO).launch {
            db.todoDao().deleteTodo(item)
        }
    }

    fun updateTodo(item: Todo) {
        CoroutineScope(Dispatchers.IO).launch {
            db.todoDao().updateTodo(item)
        }
    }

    fun insertTodo(item: Todo) {
        CoroutineScope(Dispatchers.IO).launch {
            db.todoDao().insertTodo(item)
        }
    }
}