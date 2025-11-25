using VDS.RDF;
using VDS.RDF.Query.Inference;

namespace SemanticKnowledgeAPI.Services
{
    public class ReasonerService
    {
        private readonly RdfGraphService _rdf;

        public ReasonerService(RdfGraphService rdf)
        {
            _rdf = rdf;
        }

        public int ApplyReasoning()
        {
            var graph = _rdf.GetGraph();
            var reasoner = new StaticRdfsReasoner();
            reasoner.Initialise(graph);
            reasoner.Apply(graph);
            _rdf.SaveToDisk(); 
            return graph.Triples.Count();
        }
    }
}
