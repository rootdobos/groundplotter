using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class DeploymentRepository(AppDbContext context) : GenericRepository<ElementDeployment>(context), IDeploymentRepository
    {
        public async Task<List<DeployedElementResponse>> GetDeployedElementsByMapId(int mapId)
        {
            return await context.ElementsDeployment
                .Where(d => d.MapId == mapId)
                .Include(d => d.Element)
                .Select(d => new DeployedElementResponse(
                    d.Element.Id, d.Element.Name, d.Element.Description, d.Element.ImageUrl, d.Element.Status,
                    new CoordinateDto(d.X, d.Y)))
                .ToListAsync();
        }
    }
}
