package com.example.bittodo

import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioButton
import android.widget.TextView
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.FragmentManager
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.example.bittodo.databinding.TodoListLayoutBinding
import com.example.bittodo.db.Todo
import com.example.bittodo.repository.TodoRepository

class TodoAdapter(private val supportFragmentManager: FragmentManager) :
    ListAdapter<Todo, TodoAdapter.MyViewHolder>(TodoDiffUtil()) {

    private lateinit var binding: TodoListLayoutBinding
    private lateinit var repository: TodoRepository

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val layout = LayoutInflater.from(parent.context)
        binding = DataBindingUtil.inflate(layout, R.layout.todo_list_layout, parent, false)
        repository = TodoRepository(parent.context)
        return MyViewHolder(binding.root, binding)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val todoItem = getItem(position)
        holder.apply {
            tvTodoItem.paintFlags = Paint.LINEAR_TEXT_FLAG
            tvTodoItem.text = todoItem.todoItem
            rbTodoItem.setOnCheckedChangeListener { comp, isChecked ->
                if (isChecked) {
                    tvTodoItem.paintFlags = Paint.STRIKE_THRU_TEXT_FLAG
                    repository.deleteTodo(todoItem)
                    comp.isChecked = false
                }
            }
            tvTodoItem.setOnClickListener {
                val bottomSheet = TodoBottomSheetDialog(todoItem, true)
                bottomSheet.show(supportFragmentManager, TodoBottomSheetDialog.TAG)
            }
        }
    }

    class MyViewHolder(itemView: View, binding: TodoListLayoutBinding) : ViewHolder(itemView) {
        var rbTodoItem: RadioButton
        var tvTodoItem: TextView

        init {
            rbTodoItem = binding.rbTodoItem
            tvTodoItem = binding.tvTodoItem
        }
    }

    class TodoDiffUtil : DiffUtil.ItemCallback<Todo>() {
        override fun areItemsTheSame(oldItem: Todo, newItem: Todo): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Todo, newItem: Todo): Boolean {
            return oldItem == newItem
        }
    }
}