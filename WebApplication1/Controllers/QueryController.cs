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
    public IActionResult Execute([FromBody] SparqlQueryRequest request)
    {
        var results = _sparql.ExecuteQuery(request.Query);
        return Ok(results);
    }
}

public class SparqlQueryRequest
{
    public string Query { get; set; }
}
