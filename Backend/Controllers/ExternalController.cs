using Microsoft.AspNetCore.Mvc;
using VDS.RDF.Query;

[ApiController]
[Route("api/[controller]")]
public class ExternalController : ControllerBase
{
    [HttpGet("dbpedia")]
    public IActionResult QueryDbpedia([FromQuery] string query)
    {
        try
        {
            var endpoint = new SparqlRemoteEndpoint(new Uri("https://dbpedia.org/sparql"));
            SparqlResultSet results = endpoint.QueryWithResultSet(query);

            var json = results.Select(r =>
                r.Variables.ToDictionary(v => v, v => r[v]?.ToString() ?? "")
            );

            return Ok(json);
        }
        catch (Exception ex)
        {
            return BadRequest($"SPARQL query failed: {ex.Message}");
        }
    }
}
