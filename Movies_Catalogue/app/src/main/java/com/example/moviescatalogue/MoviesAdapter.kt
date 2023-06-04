package com.example.moviescatalogue

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView.Adapter
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.bumptech.glide.Glide

class MoviesAdapter(private val moviesList: List<MoviesList>, private val context: Context) :
    Adapter<MoviesAdapter.MoviesViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MoviesViewHolder {
        val layout = LayoutInflater.from(parent.context)
        val view: View = layout.inflate(
            R.layout.movies_list_layout, parent, false
        )
        return MoviesViewHolder(view)
    }

    override fun onBindViewHolder(holder: MoviesViewHolder, position: Int) {
        if (moviesList.isNotEmpty()) {
            val movie = moviesList[position]

            holder.apply {
                tvMoviesTitle.text = movie.title
                rbMoviesRating.rating = movie.rating.toFloat()
                Glide.with(context).load(movie.image).into(ivMoviesTitleImg)

                itemView.setOnClickListener {
                    val intent = Intent(context, DetailMovieActivity::class.java)
                    intent.putExtra("MovieData", movie)
                    context.startActivity(intent)
                }
            }
        }
    }

    override fun getItemCount(): Int {
        return moviesList.size
    }

    class MoviesViewHolder(itemView: View) : ViewHolder(itemView) {
        var ivMoviesTitleImg: ImageView
        var tvMoviesTitle: TextView
        var rbMoviesRating: RatingBar

        init {
            ivMoviesTitleImg = itemView.findViewById(R.id.ivMoviesTitleImg)
            tvMoviesTitle = itemView.findViewById(R.id.tvMoviesTitle)
            rbMoviesRating = itemView.findViewById(R.id.rbMoviesRating)
        }
    }
}