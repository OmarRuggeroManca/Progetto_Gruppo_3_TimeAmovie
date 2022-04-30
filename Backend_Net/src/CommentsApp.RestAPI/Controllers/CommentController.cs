using CommentsApp.Core.Exceptions;
using CommentsApp.Core.Model;
using CommentsApp.Core.Service;
using CommentsApp.RestAPI.Mapper;
using CommentsApp.RestAPI.Model;
using CommentsApp.RestAPI.Model.Request;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CommentsApp.RestAPI.Controllers
{
    [ApiController]
    [Route("comments")]
    public class CommentController : ControllerBase
    {
        private CommentApplicationService _applicationService;

        public CommentController(CommentApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        public ActionResult<List<CommentDTO>> GetCommentList()
        {
            var commentList = _applicationService.GetAllComments();
            return Ok(commentList.Select(comment => CommentMapper.From(comment)));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("{user-id}")]
        public ActionResult<List<CommentDTO>> GetCommentListByUserId([FromRoute(Name = "user-id")] int userId)
        {
            var commentList = _applicationService.GetAllCommentsByUserID(userId);
            return Ok(commentList.Select(comment => CommentMapper.From(comment)));
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("{user-id}/{movie-id}")]
        public ActionResult<CommentDTO> GetCommentById([FromRoute(Name = "user-id")] int userId, [FromRoute(Name = "movie-id")] int movieId)
        {
            try
            {
                var comment = _applicationService.GetCommentById(userId, movieId);
                return Ok(CommentMapper.From(comment));
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    timestamp = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")
                });
            }
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        public ActionResult<CommentDTO> CreateComment([FromBody] CommentCreationParameters parameters)
        {
            try
            {
                var createdComment = _applicationService.CreateComment(parameters.UserId,
                    parameters.MovieId, parameters.MovieComment);
                return Ok(CommentMapper.From(createdComment));
            }
            catch (InvalidCommentNumberCharactersException ex)
            {
                return BadRequest(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    timestamp = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")
                });
            }
        }

        [EnableCors("MyPolicy")]
        [HttpDelete]
        [Route("{user-id}/{movie-id}")]
        public ActionResult<CommentDTO> DeleteCommentById([FromRoute(Name = "user-id")] int userId, [FromRoute(Name = "movie-id")] int movieId)
        {
            try
            {
                var deletedComment = _applicationService.DeleteCommentById(userId, movieId);
                return Ok();
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    timestamp = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")
                });
            }
        }

        [EnableCors("MyPolicy")]
        [HttpPut]
        [Route("{user-id}/{movie-id}")]
        public ActionResult<CommentDTO> UpdateComment(
            [FromRoute(Name = "user-id")] int userId, [FromRoute(Name = "movie-id")] int movieId, 
            [FromBody] CommentCreationParameters commentWithUpdatedProperties)
        {
            try
            {
                Comment commentToUpdate = new (
                    commentWithUpdatedProperties.UserId, 
                    commentWithUpdatedProperties.MovieId, 
                    commentWithUpdatedProperties.MovieComment);
                var updatedComment = _applicationService.UpdateComment(userId, movieId, commentToUpdate);
                return Ok(CommentMapper.From(updatedComment));
            }
            catch (InvalidCommentNumberCharactersException ex)
            {
                return BadRequest(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    timestamp = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")
                });
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new ErrorResponse()
                {
                    ErrorMessage = ex.Message,
                    timestamp = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")
                });
            }
        }

    }
}
