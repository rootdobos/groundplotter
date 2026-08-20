using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T: BaseEntity
    {
        Task<T?> GetByIdAsync(int id);
        void Add(T entity);
        void Update(T entity);
        //void Remove(T entity);
        //bool Exists(int id);
    }
}
