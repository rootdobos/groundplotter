using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class MapController(IMapRepository mapRepository, IUnitOfWork uow) : BaseApiController
    {
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Map>> GetMap(int id)
        {
            var map = await mapRepository.GetMapById(id);

            if (map == null)
                return NotFound();

            return Ok(map);
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateMap(int id, Map map)
        {
            if (map.Id != id)
                return BadRequest("Cannot update the map");
            mapRepository.UpdateMap(map);
            if (await uow.SaveChangesAsync())
                return NoContent();
            return BadRequest("Problem updating the map");
        }

        [HttpPost]
        public async Task<ActionResult<Map>> CreateMap(Map map)
        {
            mapRepository.AddMap(map);
            if(await uow.SaveChangesAsync())
            {
                return CreatedAtAction("GetMap", new { id = map.Id },map);
            }

            return BadRequest("Problem creating the map");
        }
    }
}
