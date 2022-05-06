using CommentsApp.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace CommentsApp.DB;
public class ApplicationDbContext : DbContext
{
    public DbSet<CommentEntity> Comments{ get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = "Server=localhost;Port=3306;Database=moviecomments;Uid=root;pwd=root";
        var mySqlServerVersion = new MySqlServerVersion(new Version(5, 7, 24));

        optionsBuilder.UseMySql(connectionString, mySqlServerVersion);
        base.OnConfiguring(optionsBuilder);
    }
}