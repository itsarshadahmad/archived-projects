package com.example.bittodo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.room.Update
import com.example.bittodo.databinding.AddTodoLayoutBinding
import com.example.bittodo.db.Todo
import com.example.bittodo.repository.TodoRepository
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class TodoBottomSheetDialog() : BottomSheetDialogFragment() {
    private lateinit var item: Todo
    private var isUpdate: Boolean = false

    constructor(item: Todo, isUpdate: Boolean) : this() {
        this.isUpdate = isUpdate
        this.item = item
    }

    private lateinit var binding: AddTodoLayoutBinding
    private lateinit var repository: TodoRepository

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        binding = DataBindingUtil.inflate(inflater, R.layout.add_todo_layout, container, false)
        repository = TodoRepository(inflater.context)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        if (isUpdate) {
            updateItem(item)
        } else {
            addItem(view)
        }
    }

    private fun addItem(view: View) {
        binding.apply {
            btnAdd.setOnClickListener {
                val todoItem = etTodoItem.text.toString()
                if (todoItem.isNotEmpty()) {
                    CoroutineScope(Dispatchers.IO).launch {
                        repository.insertTodo(Todo(todoItem = todoItem))
                        Snackbar.make(view, "Item Added", Snackbar.LENGTH_SHORT).show()
                        binding.etTodoItem.text.clear()
                        dismiss()
                    }
                }
            }
            btnCancel.setOnClickListener {
                etTodoItem.text.clear()
                dismiss()
            }
        }
    }

    private fun updateItem(item: Todo) {
        println(item.toString())
        binding.apply {
            etTodoItem.setText(item.todoItem)
            btnAdd.text = "Update"
            btnAdd.setOnClickListener {
                if (etTodoItem.text.toString().isNotEmpty()) {
                    val newTask = Todo(item.id, etTodoItem.text.toString())
                    repository.updateTodo(newTask)
                    binding.etTodoItem.setText("")
                    dismiss()
                }
            }
            btnCancel.setOnClickListener {
                binding.etTodoItem.setText("")
                dismiss()
            }
        }
    }

    companion object {
        const val TAG = "AddTodoBottomSheet"
    }
}