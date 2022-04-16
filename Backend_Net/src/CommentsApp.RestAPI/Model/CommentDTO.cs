﻿namespace CommentsApp.RestAPI.Model
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public string? MovieComment { get; set; }
    }
}
