using Core.Dtos;
using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DeploymentService( IElementRepository elementRepository, IMapRepository mapRepository,
        IDeploymentRepository deploymentRepository, IUnitOfWork uow)
    {
        public async Task<DeploymentResponse?> DeployElementAsync(CreateDeploymentRequest request)
        {
            var element = await elementRepository.GetByIdAsync(request.ElementId);
            if (element== null || element.Status == ElementStatus.Deployed)
            {
                return null;
            }
            var map = await mapRepository.GetByIdAsync(request.MapId);
            if( map ==null)
            {
                return null;
            }
            if( request.X<0 || request.X> map.Width)
            {
                return null;
            }
            if (request.Y < 0 || request.X > map.Height)
            {
                return null;
            }
            var deployment = new ElementDeployment
            {
                ElementId = request.ElementId,
                MapId = request.MapId,
                X = request.X,
                Y = request.Y,
            };

            deploymentRepository.Add(deployment);
            element.Status = ElementStatus.Deployed;
            await uow.SaveChangesAsync();

            return new DeploymentResponse(deployment.Id, element.Id, element.Name, map.Id, deployment.X, deployment.Y);
        }
    }
}
