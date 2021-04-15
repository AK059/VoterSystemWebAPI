using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VoterSystemWebAPI.Models;

namespace VoterSystemWebAPI.Data
{
    public class VoterSystemWebAPIContext : DbContext
    {
        public VoterSystemWebAPIContext(DbContextOptions<VoterSystemWebAPIContext> options)
            : base(options)
        {
        }
        public DbSet<VoterSystemWebAPI.Models.voter> voter { get; set; }
    
    }
}
