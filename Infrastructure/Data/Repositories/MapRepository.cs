using Core.Entities;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class MapRepository(AppDbContext context) : IMapRepository
    {
        public async Task<Map?> GetMapById(int id)
        {
            return await context.Maps.FindAsync(id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void UpdateMap(Map map)
        {
            context.Maps.Update(map);
        }
    }
}
