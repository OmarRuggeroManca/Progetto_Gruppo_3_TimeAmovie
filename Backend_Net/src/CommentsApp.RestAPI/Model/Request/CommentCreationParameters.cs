using System.Text.Json.Serialization;

namespace CommentsApp.RestAPI.Model.Request
{
    public class CommentCreationParameters
    {   
        [JsonPropertyName("user_id")]
        public int UserId { get; set; }
        [JsonPropertyName("movie_id")]
        public int MovieId { get; set; }
        [JsonPropertyName("movie_comment")]
        public string? MovieComment { get; set; }
    }
}
