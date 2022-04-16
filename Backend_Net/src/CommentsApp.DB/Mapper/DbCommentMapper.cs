using CommentsApp.Core.Model;
using CommentsApp.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.DB.Mapper
{
    public static class DbCommentMapper
    {
        /// <summary>
        /// It transforms a Comment object in a CommentEntity.
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        public static CommentEntity From(Comment comment)
        {
            return new()
            {
                Id = comment.Id,
                UserId = comment.UserId,
                MovieId = comment.MovieId,
                MovieComment = comment.MovieComment
            };
        }

        /// <summary>
        /// It transforms a CommentEntity object in a Comment.
        /// </summary>
        /// <param name="commentEntity"></param>
        /// <returns></returns>
        public static Comment From(CommentEntity commentEntity)
        {
            return new(commentEntity.Id, commentEntity.UserId, commentEntity.MovieId, commentEntity.MovieComment);
        }
    }
}