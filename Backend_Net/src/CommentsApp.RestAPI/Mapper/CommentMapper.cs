using CommentsApp.Core.Model;
using CommentsApp.RestAPI.Model;

namespace CommentsApp.RestAPI.Mapper
{
    public static class CommentMapper
    {
        /// <summary>
        /// It transforms a Comment object in a CommentDTO.
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        public static CommentDTO From(Comment comment) 
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
        /// It transforms a CommentDTO object in a Comment.
        /// </summary>
        /// <param name="commentDTO"></param>
        /// <returns></returns>
        public static Comment From(CommentDTO commentDTO) 
        {
            return new(commentDTO.Id, commentDTO.UserId, commentDTO.MovieId, commentDTO.MovieComment);
        }
    }
}
