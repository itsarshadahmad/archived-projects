package com.example.bittodo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bittodo.databinding.ActivityMainBinding
import com.example.bittodo.repository.TodoRepository

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        val repository = TodoRepository(this)
        val bottomSheetDialog = TodoBottomSheetDialog()
        val adapter = TodoAdapter(supportFragmentManager)
        repository.getAllTodo().observe(this, Observer {
            adapter.submitList(it)
        })

        binding.apply {
            rvList.layoutManager = LinearLayoutManager(this@MainActivity)
            rvList.adapter = adapter
            fabAdd.setOnClickListener {
                bottomSheetDialog.show(supportFragmentManager, TodoBottomSheetDialog.TAG)
            }
        }
    }
}