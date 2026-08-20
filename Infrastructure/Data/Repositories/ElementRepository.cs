using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class ElementRepository(AppDbContext context): GenericRepository<Element>(context), IElementRepository
    {
    }
}
