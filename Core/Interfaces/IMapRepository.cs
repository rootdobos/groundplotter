using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMapRepository
    {
        Task<Map?> GetMapById(int id);
        void AddMap(Map map);
        void UpdateMap(Map map);
    }
}
