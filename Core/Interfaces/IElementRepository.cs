using Core.Dtos;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IElementRepository: IGenericRepository<Element>
    {
        Task<List<ElementResponse>> GetUndeployedElementsAsync();
    }
}
