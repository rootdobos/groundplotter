using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ElementDeployment: BaseEntity
    {
        public int ElementId { get; set; }
        public Element Element { get; set; } = null!;
        public int MapId { get; set; }
        public Map Map { get; set; } = null!;
        public decimal X { get; set; }  
        public decimal Y { get; set; }
    }
}
