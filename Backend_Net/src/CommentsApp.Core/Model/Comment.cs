using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.Core.Model
{
    public class Comment
    {
        public int Id { get; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string? MovieComment { get; set; }

        public Comment(int id, int userId, int movieId, string movieComment)
        {
            Id = id;
            UserId = userId;
            MovieId = movieId;
            MovieComment = movieComment;
        }
        
        /// <summary>
        /// Constructor that not take an Id property as parameter, used for adding and updating a comment
        /// in the implementation.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="movieId"></param>
        /// <param name="movieComment"></param>
        public Comment(int userId, int movieId, string movieComment)
        {
            UserId = userId;
            MovieId = movieId;
            MovieComment = movieComment;
        }
    }
}
