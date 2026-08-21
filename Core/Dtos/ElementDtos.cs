using Core.Entities;
using Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Dtos
{
    public record CreateElementRequest(string Name, string? Description, string? ImageUrl);
    public record UpdateElementRequest(string Name, string? Description, string? ImageUrl);
    public record ElementResponse(
    int Id,
    string Name,
    string? Description,
    string? ImageUrl,
    ElementStatus Status,
    List<string> Tags);
    public record ElementWithMapResponse(int Id,
    string Name,
    string? Description,
    string? ImageUrl,
    ElementStatus Status,
    Map? Map,
    List<string> Tags);
}
