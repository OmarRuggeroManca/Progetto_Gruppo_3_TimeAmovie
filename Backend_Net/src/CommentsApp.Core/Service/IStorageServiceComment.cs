using CommentsApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


/// <summary>
/// Interface that defines the CRUD operation to be implemented relatives to a comment object.
/// </summary>
namespace CommentsApp.Core.Service
{
    public interface IStorageServiceComment
    {
        Comment CreateComment(int userId, int movieId, string movieComment);
        List<Comment> GetAllComments();
        Comment GetCommentById(int userId, int movieId);
        Comment UpdateComment(int userId, int movieId, Comment commentWithUpdatedProperties);
        bool DeleteCommentById(int UserId, int MovieId);
    }
}
