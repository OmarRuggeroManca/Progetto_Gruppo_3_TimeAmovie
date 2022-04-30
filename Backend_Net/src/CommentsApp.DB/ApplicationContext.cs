using CommentsApp.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace CommentsApp.DB;
public class ApplicationDbContext : DbContext
{
    public DbSet<CommentEntity> Comments{ get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = "Server=localhost;Port=3306;Database=moviecomments;Uid=root;pwd=";
        var mariaDbServerVersion = new MariaDbServerVersion(new Version(10, 4, 22));

        optionsBuilder.UseMySql(connectionString, mariaDbServerVersion);
        base.OnConfiguring(optionsBuilder);
    }
}