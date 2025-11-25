using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;

namespace SemanticKnowledgeAPI.Services
{
    public class SparqlService
    {
        private readonly RdfGraphService _rdf;
        public SparqlService(RdfGraphService rdf) => _rdf = rdf;

        public List<Dictionary<string, string>> ExecuteQuery(string query)
        {
            var parser = new SparqlQueryParser();
            SparqlQuery q = parser.ParseFromString(query);
            var results = (SparqlResultSet)_rdf.GetGraph().ExecuteQuery(q);
            return results.Select(r => r.Variables.ToDictionary(v => v, v => r[v]?.ToString() ?? "")).ToList();
        }
    }
}
