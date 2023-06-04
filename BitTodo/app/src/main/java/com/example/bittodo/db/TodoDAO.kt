package com.example.bittodo.db

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface TodoDAO {
    @Insert
    suspend fun insertTodo(todo: Todo)

    @Update
    suspend fun updateTodo(todo: Todo)

    @Delete
    suspend fun deleteTodo(todo: Todo)

    @Query("SELECT * FROM todo")
    fun getAllTodo(): LiveData<List<Todo>>
}