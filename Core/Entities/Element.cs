using Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Element: BaseEntity
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public ElementStatus Status { get; set; } = ElementStatus.Undeployed;

        public ICollection<ElementTag> Tags { get; set; } = [];
    }
}
