using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class TagController(ITagRepository tagRepository, IUnitOfWork uow): BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult<Tag>> CreateTap(Tag tag)
        {
            tagRepository.Add(tag);
            if (await uow.SaveChangesAsync())
            {
                return Created();
            }

            return BadRequest("Problem creating the tag");
        }
        [HttpGet]
        public async Task<ActionResult<Tag[]>> GetAllTag()
        {
            var tags = await tagRepository.GetAll();
            return Ok(tags);
        }
    }
}
