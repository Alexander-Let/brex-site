export type ExampleId = 'simple' | 'shop-api'

export type BrexExample = {
  id: ExampleId
  source: string
  output: string
}

export const EXAMPLES: BrexExample[] = [
  {
    id: 'simple',
    source: `# Brex simple syntax
PROJECT "hello-cli";
DESC "Minimal CLI built by an AI agent from a Brex spec";
STACK "rust", "clap";

ROLE "Senior backend developer";
CAN "code", "tests";

RULE "Prefer small, readable modules";
RULE "no_unwrap" "Avoid unwrap in library code";

GOAL "mvp" "Binary with --help" "Hello command prints a greeting";

FILE "app" "src/main.rs";
GATE "tests" "cargo test";

TASK "bootstrap";
USE "senior_backend_developer";
MAKE "app";
ALLOW "src/**";
FORBID ".env", ".git/**";
BUDGET 12 40;
DONE "tests";
SAY """
Create a clap-based CLI with a hello subcommand.
Add a trivial unit test.
""";
`,
    output: `# Project: hello-cli

## Description
Minimal CLI built by an AI agent from a Brex spec

## Stack
- rust
- clap

## Goals
### mvp
- Binary with --help
- Hello command prints a greeting

## Gates
- **tests** (command): cargo test
`,
  },
  {
    id: 'shop-api',
    source: `import "../../std/rust_web.brex"

project "shop-api" {
  description = "REST API for an online store"
  stack = ["rust", "axum", "postgres"]
}

goal "mvp_catalog" {
  criteria = [
    "Product CRUD",
    "List pagination",
    "OpenAPI 3.1",
  ]
}

RULE! "no_plaintext_secrets" "No plaintext secrets in code or configs";

agent "backend" {
  role = "Implements the service, migrations, and tests"
  capabilities = ["code", "tests", "sql"]
}

gate "unit_tests" {
  kind = "command"
  run = "cargo test -p api"
}

task "scaffold_service" {
  agent = agent.backend
  produces = [artifact.api_crate]
  allow_write = ["crates/api/**"]
  forbid_write = [".github/**", "crates/billing/**"]
  done_when = [gate.unit_tests]
  instructions = """
    Create a crate with an axum router and healthcheck GET /health.
  """
}
`,
    output: `# Project: shop-api

## Description
REST API for an online store

## Stack
- rust
- axum
- postgres

## Constraints
- **no_plaintext_secrets** (must): No plaintext secrets

## Tasks
- scaffold_service → agent.backend → gate.unit_tests
`,
  },
]

