using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ElementTag : BaseEntity
    {
        public int TagId { get; set; }
        public Tag Tag { get; set; } = null!;
        public int ElementId { get; set; }
        public Element Element { get; set; } = null!;
    }
}
