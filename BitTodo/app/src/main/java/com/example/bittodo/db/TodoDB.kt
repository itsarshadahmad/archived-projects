package com.example.bittodo.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(entities = [Todo::class], version = 1)
abstract class TodoDB : RoomDatabase() {
    abstract fun todoDao(): TodoDAO

    companion object {
        @Volatile
        private var INSTANCE: TodoDB? = null

        fun getDatabase(context: Context): TodoDB {
            if (INSTANCE == null) {
                synchronized(this) {
                    INSTANCE = Room.databaseBuilder(
                        context, TodoDB::class.java, "todoDB"
                    ).build()
                }
            }
            return INSTANCE!!
        }
    }
}