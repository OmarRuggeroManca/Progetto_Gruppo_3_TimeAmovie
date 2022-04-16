using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommentsApp.Core.Exceptions
{
    public class InvalidCommentNumberCharactersException : Exception
    {
        public InvalidCommentNumberCharactersException() : base("The comment must have less than 160 characters.") {} 
    }
}
