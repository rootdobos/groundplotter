using Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public record CreateDeploymentRequest(int ElementId, int MapId, decimal X, decimal Y);
    public record DeploymentResponse(int Id, int ElementId, string ElementName, int MapId, decimal X, decimal Y);

    public record CoordinateDto( decimal X, decimal Y);
    public record DeployedElementResponse(
        int Id,
        string Name,
        string? Description,
        string? ImageUrl,
        ElementStatus Status,
        List<string> Tags,
        CoordinateDto Coordinates);
}
