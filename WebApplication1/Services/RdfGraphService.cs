using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Writing;

namespace SemanticKnowledgeAPI.Services
{
    public class RdfGraphService
    {
        private readonly Graph _graph;
        private readonly string _dataFilePath = "Data/data.ttl";

        public RdfGraphService()
        {
            _graph = new Graph();
            _graph.BaseUri = new Uri("http://example.org");

            if (File.Exists(_dataFilePath))
            {
                try
                {
                    var parser = new TurtleParser();
                    parser.Load(_graph, _dataFilePath);
                    Console.WriteLine($"✅ RDF data loaded from {_dataFilePath}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Failed to load RDF file: {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine($"ℹ️ No existing RDF file found, starting with empty graph.");
            }
        }

        public void AddTriple(string subject, string predicate, string obj)
        {
            _graph.Assert(
                _graph.CreateUriNode(UriFactory.Create(subject)),
                _graph.CreateUriNode(UriFactory.Create(predicate)),
                _graph.CreateUriNode(UriFactory.Create(obj))
            );
            SaveToDisk();
        }

        public IEnumerable<Triple> GetAllTriples() => _graph.Triples;

        public string SerializeRdf(string format = "turtle")
        {
            using var sw = new System.IO.StringWriter();

            if (format.Equals("jsonld", StringComparison.OrdinalIgnoreCase))
            {
                IStoreWriter jsonWriter = new JsonLdWriter();
                TripleStore store = new TripleStore();
                store.Add(_graph);
                jsonWriter.Save(store, sw);
            }
            else
            {
                IRdfWriter writer = format switch
                {
                    "xml" => new RdfXmlWriter(),
                    "ntriples" => new NTriplesWriter(),
                    _ => new CompressingTurtleWriter()
                };
                writer.Save(_graph, sw);
            }

            return sw.ToString();
        }

        public void SaveToDisk()
        {
            Directory.CreateDirectory("Data");
            var writer = new CompressingTurtleWriter();
            writer.Save(_graph, _dataFilePath);
            Console.WriteLine($"💾 RDF graph saved to {_dataFilePath}");
        }

        public IGraph GetGraph() => _graph;
    }
}
