using Microsoft.AspNetCore.Mvc;
using SemanticKnowledgeAPI.Services;
using VDS.RDF.Query;

[ApiController]
[Route("api/[controller]")]
public class QueryController : ControllerBase
{
    private readonly SparqlService _sparql;

    public QueryController(SparqlService sparql)
    {
        _sparql = sparql;
    }

    [HttpPost]
    public IActionResult Execute([FromBody] string query)
    {
        var results = _sparql.ExecuteQuery(query);
        return Ok(results);
    }
}
