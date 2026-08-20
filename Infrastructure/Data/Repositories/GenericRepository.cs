using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class GenericRepository<T>(AppDbContext context) : IGenericRepository<T> where T:BaseEntity
    {
        public void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }

    }
}
