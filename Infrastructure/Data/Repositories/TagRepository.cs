using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class TagRepository(AppDbContext context): GenericRepository<Tag>(context), ITagRepository
    {
    }
}
