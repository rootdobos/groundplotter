using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Map: BaseEntity
    {
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public ICollection<ElementDeployment> Deployments { get; set; } = [];
    }
}
