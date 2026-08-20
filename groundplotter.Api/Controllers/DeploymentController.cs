using Application.Services;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class DeploymentController(IDeploymentRepository deploymentRepository,
        DeploymentService deploymentService, IMapRepository mapRepository):BaseApiController
    {
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Map>> GetDeployment(int id)
        {
            var deployment = await deploymentRepository.GetByIdAsync(id);

            if (deployment == null)
                return NotFound();

            return Ok(deployment);
        }

        [HttpPost]
        public async Task<ActionResult<DeploymentResponse>> CreateDeployment(CreateDeploymentRequest request)
        {
            var result = await deploymentService.DeployElementAsync(request);
            if (result == null)
                return BadRequest("Element not found, already deployed, or map not found");

            return CreatedAtAction(nameof(GetDeployment), new { id = result.Id }, result);
        }
        [HttpGet]
        public async Task<ActionResult<List<DeployedElementResponse>>> GetDeployedElements([FromQuery] int mapId)
        {
            var map = await mapRepository.GetByIdAsync(mapId);
            if (map is null) return NotFound("Map Not Found");

            var elements = await deploymentRepository.GetDeployedElementsByMapId(mapId);
            return Ok(elements);
        }
    }
}
