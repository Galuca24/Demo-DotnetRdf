using Microsoft.AspNetCore.Mvc;
using SemanticKnowledgeAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class GraphController : ControllerBase
{
    private readonly RdfGraphService _rdf;

    public GraphController(RdfGraphService rdf)
    {
        _rdf = rdf;
    }

    [HttpPost("triple")]
    public IActionResult AddTriple([FromQuery] string s, [FromQuery] string p, [FromQuery] string o)
    {
        _rdf.AddTriple(s, p, o);
        return Ok("Triple added successfully!");
    }

    [HttpGet]
    public IActionResult GetTriples()
    {
        var triples = _rdf.GetAllTriples().Select(t => new { s = t.Subject.ToString(), p = t.Predicate.ToString(), o = t.Object.ToString() });
        return Ok(triples);
    }

    [HttpGet("export")]
    public IActionResult Export([FromQuery] string format = "turtle")
    {
        return Content(_rdf.SerializeRdf(format), "text/plain");
    }
}
