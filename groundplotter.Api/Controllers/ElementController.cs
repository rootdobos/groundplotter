using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ElementController(IElementRepository elementRepository, IUnitOfWork uow):BaseApiController
    {
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Map>> GetElement(int id)
        {
            var element = await elementRepository.GetByIdAsync(id);

            if (element == null)
                return NotFound();

            return Ok(element);
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ElementResponse>>> GetElements()
        {
            var undeployedElements= await elementRepository.GetUndeployedElementsAsync();
            return Ok(undeployedElements);
        }

        [HttpPost]
        public async Task<ActionResult<Element>> CreateElement(CreateElementRequest request)
        {
            var element = new Element
            {
                Name = request.Name,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                Status = Core.Enums.ElementStatus.Undeployed,
            };
            elementRepository.Add(element);
            if (await uow.SaveChangesAsync())
            {
                return CreatedAtAction("GetElement", new { id = element.Id }, element);
            }

            return BadRequest("Problem creating the map");
        }
    }
}
