using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Tag : BaseEntity
    {
        public required string Name { get; set; }
        public ICollection<ElementTag> Elements { get; set; } = [];
    }
}
