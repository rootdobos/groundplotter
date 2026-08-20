using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class MapController(IMapRepository mapRepository) : BaseApiController
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
            if (await mapRepository.SaveChangesAsync())
                return NoContent();
            return BadRequest("Problem updating the map");
        }
    }
}
