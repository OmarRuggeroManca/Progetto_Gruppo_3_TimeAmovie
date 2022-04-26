using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.Core.Exceptions
{
    public class CommentNotFoundException : Exception
    {
        public CommentNotFoundException():base("comment not found") {}
    }
}
