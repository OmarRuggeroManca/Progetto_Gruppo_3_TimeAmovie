using CommentsApp.Core.Exceptions;
using CommentsApp.Core.Model;
using CommentsApp.Core.Service;
using CommentsApp.DB.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.DB.Service
{
    /// <summary>
    /// Service that implements the CRUD interface to manage data in a database.
    /// </summary>
    public class MySqlCommentsStorageService : IStorageServiceComment
    {
        private ApplicationDbContext _context;

        public MySqlCommentsStorageService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }

        public Comment CreateComment(int userId, int movieId, string movieComment)
        {
            Comment commentToAdd = new(userId, movieId, movieComment);
            var commentAdded = _context.Comments.Add(DbCommentMapper.From(commentToAdd));
            _context.SaveChanges();
            return DbCommentMapper.From(commentAdded.Entity);
        }

        public List<Comment> GetAllComments() 
        {
            var commentList = _context.Comments;
            return commentList.Select(comment => DbCommentMapper.From(comment)).ToList();
        }

        public Comment? GetCommentById(int commentId)
        {
            var comment = _context.Comments.Find(commentId);
            if (comment != null)
            {
                return DbCommentMapper.From(comment);
            }
            return null;
        }

        public Comment UpdateComment(int commentId, Comment commentWithUpdatedProperties)
        {
            var commentToUpdate = _context.Comments.Find(commentId);
            if (commentToUpdate != null)
            {
                commentToUpdate.UserId = commentWithUpdatedProperties.UserId;
                commentToUpdate.MovieId = commentWithUpdatedProperties.MovieId;
                commentToUpdate.MovieComment = commentWithUpdatedProperties.MovieComment;

                _context.SaveChanges();
                return DbCommentMapper.From(commentToUpdate);
            }
            return DbCommentMapper.From(commentToUpdate);
        }

        public bool DeleteCommentById(int UserId, int MovieId)
        {
            var commentToDelete = _context.Comments.FirstOrDefault(c => c.UserId == UserId && c.MovieId == MovieId);
            if (commentToDelete != null)
            {
                _context.Comments.Remove(commentToDelete);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}






