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
    public class ElementRepository(AppDbContext context) : GenericRepository<Element>(context), IElementRepository
    {
        public async Task<List<ElementResponse>> GetUndeployedElementsAsync()
        {
            return await context.Elements
                .Where(e => e.Status == Core.Enums.ElementStatus.Undeployed)
                .Select(e => new ElementResponse (
                    e.Id,
                    e.Name,
                    e.Description,
                    e.ImageUrl,
                    e.Status,
                    e.Tags.Select( t=> t.Tag.Name).ToList() ))
                .ToListAsync();
        }
    }
}
