using Microsoft.AspNetCore.Mvc;
using SemanticKnowledgeAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class ReasoningController : ControllerBase
{
    private readonly ReasonerService _reasoner;

    public ReasoningController(ReasonerService reasoner)
    {
        _reasoner = reasoner;
    }

    [HttpPost]
    public IActionResult ApplyReasoning()
    {
        int totalTriples = _reasoner.ApplyReasoning();
        return Ok($"Reasoning applied successfully. Total triples now: {totalTriples}");
    }
}
