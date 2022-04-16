using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.DB.Entities
{
    [Table("comments")]
    public class CommentEntity
    {
        [Column("id"), Key]
        public int Id { get; set; }
        [Column("user_id"), Required]
        public int UserId { get; set; }
        [Column("movie_id"), Required]
        public int MovieId { get; set; }
        [Column("movie_comment"), Required]
        public string MovieComment { get; set; }
    }
}
