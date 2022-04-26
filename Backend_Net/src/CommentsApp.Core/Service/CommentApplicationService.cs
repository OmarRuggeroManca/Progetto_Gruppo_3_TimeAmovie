using CommentsApp.Core.Exceptions;
using CommentsApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


/// <summary>
/// Service that implements the CRUD interface and check the parameters passed to the methods.
/// When the parameters are not met, an exception is triggered.
/// </summary>
namespace CommentsApp.Core.Service
{
    public class CommentApplicationService
    {
        private IStorageServiceComment _storageServiceComment;
        private const int maxCharacters = 160;

        public CommentApplicationService(IStorageServiceComment storageService)
        {
            _storageServiceComment = storageService;
        }

        public Comment CreateComment(int userId, int movieId, string movieComment)
        {
            ///If the comment has less than 10 characters an exception is triggered.
            CheckMinCharacters(movieComment);
            return _storageServiceComment.CreateComment(userId, movieId, movieComment);
        }
        public List<Comment> GetAllComments() => _storageServiceComment.GetAllComments();
        public Comment GetCommentById(int commentId) 
        {
            var comment = _storageServiceComment.GetCommentById(commentId);
            if (comment != null)
            {
                return comment;
            }
            throw new CommentNotFoundException();
        }
        public Comment UpdateComment(int commentId, Comment commentWithUpdatedProperties)
        {
            var comment = _storageServiceComment.GetCommentById(commentId);
            /// If the comment isn't null and has less than 160 characters, it will be updated, 
            /// otherwise a CommentNotFoundException is triggered.
            if (comment != null)
            {
                CheckMinCharacters(commentWithUpdatedProperties.MovieComment);
                return _storageServiceComment.UpdateComment(commentId, commentWithUpdatedProperties);
            }
            throw new CommentNotFoundException();
        }

        public bool DeleteCommentById(int userId, int movieId) 
        {
            var comment = _storageServiceComment.DeleteCommentById(userId, movieId);
            if (comment != false)
            {
                return true;
            }
            throw new CommentNotFoundException();
        }

        /// <summary>
        /// It controls if the number of characters of a string is less than 160 or it throws an exception.
        /// </summary>
        /// <param name="numCharacters"></param>
        /// <exception cref="InvalidCommentNumberCharactersException"></exception>
        public void CheckMinCharacters(string numCharacters)
        {
            if (numCharacters.Length > maxCharacters)
            {
                throw new InvalidCommentNumberCharactersException();
            }
        }
    }
}
