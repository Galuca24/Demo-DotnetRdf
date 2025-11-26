Semantic Knowledge Graph - dotNetRDF Demo 

This project is a demo application illustrating the power of the Semantic Web and the usage of the dotNetRDF library in a .NET Core environment, coupled with an Angular Frontend interface.

The application allows for managing a Knowledge Graph, running SPARQL queries, applying logical inference (Reasoning), and querying external sources (DBpedia).

Key Features

The project covers the following key concepts of dotNetRDF:

RDF Graph Management (CRUD):

Creating and maintaining an in-memory graph (IGraph).

Adding triples (Subject - Predicate - Object).

Data persistence in a local file (data.ttl).

Serialization and Export:

Exporting data in multiple formats: Turtle (human-readable), JSON-LD (for the web), RDF/XML (legacy), and N-Triples.

SPARQL Query Engine (Leviathan):

Executing complex SPARQL queries directly on the in-memory graph.

Support for filtering, selection, and projection.

Reasoning (Inference):

Using StaticRdfsReasoner to automatically deduce new information.

Support for RDFS (subClassOf, subPropertyOf).

Federated Querying:

Connecting to external SPARQL endpoints (e.g., DBpedia) to fetch live data from the internet.

🛠️ Technologies Used

Backend: ASP.NET Core Web API (.NET 8)

Semantic Library: dotNetRDF (v3.x)

Frontend: Angular

Data Format: Turtle (.ttl)

⚙️ Installation and Setup

1. Backend (.NET)

Ensure you have the .NET SDK installed.

cd Backend
dotnet restore
dotnet run



The backend will start at https://localhost:7148 (or similar).

2. Frontend (Angular)

Ensure you have Node.js and Angular CLI installed.

cd Frontend/WebAppFE
npm install
ng serve



The frontend will be accessible at http://localhost:4200.



 API Documentation

🔹 Graph Controller (Data Manipulation)

Method

Endpoint

Description

Parameters

GET

/api/Graph

Returns all triples in the graph (JSON).

-

POST

/api/Graph/triple

Adds a new triple.

?s=URI, ?p=URI, ?o=URI

GET

/api/Graph/export

Downloads the serialized graph.

?format=turtle (or jsonld, xml, ntriples)

🔹 Query Controller (Local SPARQL)

Method

Endpoint

Description

Body (JSON)

POST

/api/Query

Executes a SPARQL query on local data.

{ "query": "SELECT * WHERE { ?s ?p ?o }" }

🔹 Reasoning Controller (Inference)

Method

Endpoint

Description

Effect

POST

/api/Reasoning

Applies RDFS rules and materializes deductions.

Automatically adds new triples to the graph.

🔹 External Controller (DBpedia)

Method

Endpoint

Description

Parameters

GET

/api/External/dbpedia

Queries Wikipedia (DBpedia) via SPARQL.

?query=SELECT...

 Demo Scenario: Reasoning

To test the inference functionality, follow this scenario:

1. Initial Schema (Rules):
The system is configured with the following RDFS rules:

Dog is a subclass of Animal.

isFriendWith is a sub-property of knows.

2. Add Fact (Input):
Add a triple that simply states: "Ion is friend with Maria".

Subject: http://example.org/Ion

Predicate: http://example.org/isFriendWith

Object: http://example.org/Maria

3. Execute Reasoning:
Call the /api/Reasoning endpoint.

4. Result (Output):
Query the graph for the knows relationship. The system will automatically return:

"Ion knows Maria" (automatically deduced relationship).

Project Structure

/
├── Backend/      # .NET Backend
│   ├── Controllers/           # API Endpoints
│   ├── Services/              # dotNetRDF Logic (Graph, Sparql, Reasoner)
│   ├── Data/                  # Persistence file data.ttl
│   └── Program.cs             # CORS & Services Configuration
├── Frontend/WebAppFE/         # Angular Frontend
│   ├── src/app/               # Components and Services
│   └── ...
└── README.md                  # Documentation
