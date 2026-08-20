using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public record CreateDeploymentRequest(int ElementId, int MapId, decimal X, decimal Y);
    public record DeploymentResponse(int Id, int ElementId, string ElementName, int MapId, decimal X, decimal Y);
}
