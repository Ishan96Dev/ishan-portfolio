'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// ─── Architecture diagrams ────────────────────────────────────────────────────
const ARCHITECTURES = [
    {
        id: 'rag',
        title: 'RAG Architecture',
        description:
            'Retrieval-Augmented Generation — how documents are ingested, indexed, retrieved, and answered by an LLM.',
        color: 'teal',
        nodes: [
            {
                id: 'docs',
                label: 'Documents',
                sublabel: 'PDF / TXT / Web',
                x: 60, y: 160, w: 110, h: 48,
                detail: 'Raw documents from various sources — PDFs, plain text files, web pages, or databases — are the starting point of a RAG pipeline.',
            },
            {
                id: 'chunk',
                label: 'Chunking',
                sublabel: 'Text Splitter',
                x: 230, y: 160, w: 110, h: 48,
                detail: 'Documents are split into overlapping chunks (e.g. 512 tokens with 50-token overlap) to fit within embedding model context windows and preserve sentence boundaries.',
            },
            {
                id: 'embed',
                label: 'Embeddings',
                sublabel: 'OpenAI / HF',
                x: 400, y: 160, w: 110, h: 48,
                detail: 'Each chunk is converted into a dense vector representation using an embedding model such as text-embedding-3-small (OpenAI) or all-MiniLM-L6-v2 (HuggingFace).',
            },
            {
                id: 'vdb',
                label: 'Vector DB',
                sublabel: 'Milvus / ChromaDB',
                x: 570, y: 160, w: 115, h: 48,
                detail: 'Embedding vectors are stored in a vector database (Milvus or ChromaDB) which supports efficient approximate nearest-neighbour (ANN) search at scale.',
            },
            {
                id: 'query',
                label: 'User Query',
                sublabel: 'Natural Language',
                x: 310, y: 50, w: 110, h: 48,
                detail: 'The user submits a natural language question. This query is also embedded into a vector using the same model used during ingestion.',
            },
            {
                id: 'retrieval',
                label: 'Retrieval',
                sublabel: 'Top-K Search',
                x: 460, y: 280, w: 110, h: 48,
                detail: 'The query vector is compared against stored chunk vectors using cosine similarity. The top-K most relevant chunks are retrieved and re-ranked if needed.',
            },
            {
                id: 'llm',
                label: 'LLM',
                sublabel: 'GPT / Gemini / Claude',
                x: 310, y: 390, w: 115, h: 48,
                detail: 'Retrieved chunks are injected into the LLM prompt as context. The model uses this grounded information to generate a factual, source-backed answer.',
            },
            {
                id: 'response',
                label: 'Response',
                sublabel: 'Grounded Answer',
                x: 170, y: 390, w: 110, h: 48,
                detail: 'The final answer is returned to the user, optionally with source citations pointing back to the original document chunks used as context.',
            },
        ],
        edges: [
            { from: 'docs', to: 'chunk' },
            { from: 'chunk', to: 'embed' },
            { from: 'embed', to: 'vdb' },
            { from: 'query', to: 'embed' },
            { from: 'vdb', to: 'retrieval' },
            { from: 'retrieval', to: 'llm' },
            { from: 'llm', to: 'response' },
        ],
    },
    {
        id: 'backend',
        title: 'Backend Architecture',
        description:
            'Request lifecycle from Next.js frontend through the API gateway to FastAPI / Node.js services and the database layer.',
        color: 'blue',
        nodes: [
            { id: 'ui',      label: 'Next.js',    sublabel: 'Frontend UI',      x: 60,  y: 160, w: 110, h: 48, detail: 'The Next.js frontend initiates API calls from React Server Components or client-side fetch hooks. All requests go through HTTPS with strict CSP headers.' },
            { id: 'gateway', label: 'API Gateway', sublabel: 'Auth / Rate Limit', x: 240, y: 160, w: 115, h: 48, detail: 'An API gateway validates JWT tokens, enforces rate limits (e.g. per-IP throttling), and routes requests to the appropriate backend service.' },
            { id: 'fastapi', label: 'FastAPI',    sublabel: 'Python Backend',   x: 410, y: 100, w: 110, h: 48, detail: 'The FastAPI service handles AI/ML workloads — RAG pipelines, OpenAI calls, and data processing — using async endpoints and Pydantic models for validation.' },
            { id: 'node',    label: 'Node.js',    sublabel: 'REST API',         x: 410, y: 220, w: 110, h: 48, detail: 'The Node.js service manages real-time financial data feeds, WebSocket connections, and lighter CRUD operations with sub-millisecond response times.' },
            { id: 'db',      label: 'Database',   sublabel: 'PostgreSQL / MSSQL', x: 590, y: 160, w: 120, h: 48, detail: 'Persistent data is stored in PostgreSQL or MS SQL. Queries use parameterised statements; connection pooling (PgBouncer) keeps latency minimal.' },
            { id: 'resp',    label: 'Response',   sublabel: 'JSON / Stream',    x: 60,  y: 300, w: 110, h: 48, detail: 'The response is returned as JSON or as a server-sent event stream for real-time updates, then displayed via React state.' },
        ],
        edges: [
            { from: 'ui', to: 'gateway' },
            { from: 'gateway', to: 'fastapi' },
            { from: 'gateway', to: 'node' },
            { from: 'fastapi', to: 'db' },
            { from: 'node', to: 'db' },
            { from: 'fastapi', to: 'resp' },
            { from: 'node', to: 'resp' },
        ],
    },
    {
        id: 'cicd',
        title: 'CI/CD Architecture',
        description:
            'Automated pipeline from code push through testing and build to Vercel production deployment.',
        color: 'purple',
        nodes: [
            { id: 'push',   label: 'Git Push',       sublabel: 'GitHub / GitLab',    x: 60,  y: 170, w: 110, h: 48, detail: 'Developer pushes code to a feature branch. A pull request triggers the CI pipeline automatically via webhooks.' },
            { id: 'lint',   label: 'Lint & Scan',    sublabel: 'ESLint / Trivy',     x: 240, y: 170, w: 115, h: 48, detail: 'Static analysis (ESLint) and security scanning (Trivy for CVEs, CodeQL for secrets) run in parallel. The build is blocked if critical issues are found.' },
            { id: 'build',  label: 'Build',          sublabel: 'next build',         x: 420, y: 170, w: 110, h: 48, detail: 'Next.js production build verifies type correctness, tree-shakes unused code, and generates optimised static and server-side assets.' },
            { id: 'a11y',   label: 'A11y Audit',     sublabel: 'axe-core / pa11y',   x: 420, y: 290, w: 115, h: 48, detail: 'Automated WCAG 2.1 AA accessibility checks run against the built HTML using axe-core and pa11y-ci, surfacing violations before deployment.' },
            { id: 'deploy', label: 'Deploy',         sublabel: 'Vercel Production',  x: 590, y: 170, w: 115, h: 48, detail: 'On a successful build and all checks passing on main, Vercel\'s GitHub integration deploys the new version to production via its global CDN.' },
        ],
        edges: [
            { from: 'push', to: 'lint' },
            { from: 'lint', to: 'build' },
            { from: 'build', to: 'a11y' },
            { from: 'build', to: 'deploy' },
            { from: 'a11y', to: 'deploy' },
        ],
    },
    {
        id: 'agent',
        title: 'AI Agent Architecture',
        description:
            'Agentic AI workflow — how a user request is orchestrated through tools, MCP servers, and an LLM reasoning loop.',
        color: 'orange',
        nodes: [
            { id: 'user',    label: 'User',           sublabel: 'Natural Language',   x: 60,  y: 180, w: 110, h: 48, detail: 'The user submits a goal or task in natural language. The agent loop begins with this prompt.' },
            { id: 'agent',   label: 'AI Agent',       sublabel: 'GPT-4 / Claude',     x: 240, y: 180, w: 115, h: 48, detail: 'A ReAct or Plan-and-Execute agent powered by GPT-4 or Claude. It decomposes the goal into sub-tasks and selects tools to call.' },
            { id: 'mcp',     label: 'MCP Server',     sublabel: 'Tool Router',        x: 420, y: 100, w: 115, h: 48, detail: 'A Model Context Protocol (MCP) server exposes structured tools to the LLM — file operations, web search, image generation, code execution.' },
            { id: 'tools',   label: 'External Tools', sublabel: 'APIs / Services',    x: 600, y: 100, w: 115, h: 48, detail: 'Third-party APIs and local services: OpenAI Images, GitHub API, search engines, file system, databases.' },
            { id: 'memory',  label: 'Memory',         sublabel: 'Vector + KV Store',  x: 420, y: 260, w: 115, h: 48, detail: 'Short-term (conversation history) and long-term (vector-stored facts) memory give the agent context across turns.' },
            { id: 'response',label: 'Response',       sublabel: 'Action / Answer',    x: 60,  y: 320, w: 110, h: 48, detail: 'The agent returns a final synthesised answer or performs a concrete action (e.g. creates a file, sends a message) in the user\'s environment.' },
        ],
        edges: [
            { from: 'user', to: 'agent' },
            { from: 'agent', to: 'mcp' },
            { from: 'mcp', to: 'tools' },
            { from: 'agent', to: 'memory' },
            { from: 'memory', to: 'agent' },
            { from: 'tools', to: 'agent' },
            { from: 'agent', to: 'response' },
        ],
    },
];

const COLOR_TOKENS = {
    teal:   { node: '#0d9488', border: '#14b8a6', text: 'text-teal-400',   activeBorder: 'border-teal-500',   activeTab: 'bg-teal-500/20 border-teal-500 text-teal-400' },
    blue:   { node: '#2563eb', border: '#3b82f6', text: 'text-blue-400',   activeBorder: 'border-blue-500',   activeTab: 'bg-blue-500/20 border-blue-500 text-blue-400'  },
    purple: { node: '#7c3aed', border: '#8b5cf6', text: 'text-purple-400', activeBorder: 'border-purple-500', activeTab: 'bg-purple-500/20 border-purple-500 text-purple-400' },
    orange: { node: '#d97706', border: '#f59e0b', text: 'text-orange-400', activeBorder: 'border-orange-500', activeTab: 'bg-orange-500/20 border-orange-500 text-orange-400' },
};

// Compute centre-points of nodes for edges
function nodeCentre(node) {
    return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

function DiagramSVG({ arch, selectedNode, onSelectNode, zoom }) {
    const color = COLOR_TOKENS[arch.color];
    // Build a map for quick lookup
    const nodeMap = Object.fromEntries(arch.nodes.map((n) => [n.id, n]));

    return (
        <svg
            viewBox="0 0 760 500"
            className="h-auto transition-[width] duration-200 mx-auto block"
            role="img"
            aria-label={`${arch.title} diagram — click a node to learn more`}
            style={{ width: `${zoom * 100}%`, maxWidth: zoom <= 1 ? '100%' : 'none', maxHeight: zoom === 1 ? '340px' : 'none' }}
        >
            {/* Edges */}
            <g aria-hidden="true">
                {arch.edges.map((edge, i) => {
                    const from = nodeMap[edge.from];
                    const to = nodeMap[edge.to];
                    if (!from || !to) return null;
                    const fc = nodeCentre(from);
                    const tc = nodeCentre(to);
                    return (
                        <line
                            key={i}
                            x1={fc.x} y1={fc.y}
                            x2={tc.x} y2={tc.y}
                            stroke="#374151"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                        />
                    );
                })}
            </g>

            {/* Nodes */}
            {arch.nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                    <g
                        key={node.id}
                        className="cursor-pointer"
                        onClick={() => onSelectNode(isSelected ? null : node)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelectNode(isSelected ? null : node);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${node.label}: ${node.sublabel}`}
                    >
                        <rect
                            x={node.x}
                            y={node.y}
                            width={node.w}
                            height={node.h}
                            rx={8}
                            fill={isSelected ? color.border + '33' : '#1a1a1a'}
                            stroke={isSelected ? color.border : '#374151'}
                            strokeWidth={isSelected ? 2 : 1}
                        />
                        <text
                            x={node.x + node.w / 2}
                            y={node.y + 17}
                            textAnchor="middle"
                            fill={isSelected ? color.border : '#e5e7eb'}
                            fontSize="11"
                            fontWeight="600"
                            aria-hidden="true"
                        >
                            {node.label}
                        </text>
                        <text
                            x={node.x + node.w / 2}
                            y={node.y + 32}
                            textAnchor="middle"
                            fill="#6b7280"
                            fontSize="9"
                            aria-hidden="true"
                        >
                            {node.sublabel}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export function ArchitectureSection() {
    const shouldReduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState('rag');
    const [selectedNode, setSelectedNode] = useState(null);
    const [zoom, setZoom] = useState(1);

    const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
    const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
    const zoomReset = () => setZoom(1);

    const active = ARCHITECTURES.find((a) => a.id === activeId) ?? ARCHITECTURES[0];
    const color = COLOR_TOKENS[active.color];

    const handleTabChange = (id) => {
        setActiveId(id);
        setSelectedNode(null);
        setZoom(1);
    };

    return (
        <section
            id="architecture"
            aria-labelledby="arch-heading"
            className="py-24 px-6 md:px-12 relative bg-background overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-64 bg-teal-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2
                        id="arch-heading"
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400"
                    >
                        Engineering Architecture
                    </h2>
                    <p className="text-neutral-400 mt-4 text-sm max-w-xl mx-auto">
                        Interactive diagrams showing how the systems I build are designed.
                        Click any node for details.
                    </p>
                </motion.div>

                {/* Architecture tabs */}
                <div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    role="tablist"
                    aria-label="Architecture types"
                >
                    {ARCHITECTURES.map((arch) => {
                        const c = COLOR_TOKENS[arch.color];
                        const isActive = arch.id === activeId;
                        return (
                            <button
                                key={arch.id}
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`arch-panel-${arch.id}`}
                                id={`arch-tab-${arch.id}`}
                                onClick={() => handleTabChange(arch.id)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                                    isActive
                                        ? c.activeTab
                                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                                }`}
                            >
                                {arch.title}
                            </button>
                        );
                    })}
                </div>

                {/* Diagram panel */}
                <motion.div
                    key={activeId}
                    role="tabpanel"
                    id={`arch-panel-${active.id}`}
                    aria-labelledby={`arch-tab-${active.id}`}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden hover:border-neutral-700 transition-colors duration-300"
                >
                    {/* Description bar */}
                    <div className={`px-6 py-4 border-b border-neutral-800`}>
                        <p className="text-sm text-neutral-400">{active.description}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* SVG diagram */}
                        <div className="lg:col-span-2 p-6 border-b lg:border-b-0 lg:border-r border-neutral-800">
                            <div className="flex items-center justify-end gap-2 mb-3" role="group" aria-label="Diagram zoom controls">
                                <span className="text-xs text-neutral-500 mr-1 tabular-nums" aria-live="polite">
                                    {Math.round(zoom * 100)}%
                                </span>
                                <button
                                    type="button"
                                    onClick={zoomOut}
                                    disabled={zoom <= MIN_ZOOM}
                                    aria-label="Zoom out diagram"
                                    className="p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <ZoomOut size={16} aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={zoomIn}
                                    disabled={zoom >= MAX_ZOOM}
                                    aria-label="Zoom in diagram"
                                    className="p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <ZoomIn size={16} aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={zoomReset}
                                    disabled={zoom === 1}
                                    aria-label="Reset diagram zoom"
                                    className="p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <RotateCcw size={16} aria-hidden="true" />
                                </button>
                            </div>
                            <div className="overflow-auto max-h-[380px] rounded-lg" tabIndex={0} aria-label="Scrollable diagram area">
                                <DiagramSVG
                                    arch={active}
                                    selectedNode={selectedNode}
                                    onSelectNode={setSelectedNode}
                                    zoom={zoom}
                                />
                            </div>
                        </div>
                        {/* Node detail panel */}
                        <div className="p-6 flex flex-col justify-center min-h-[200px]">
                            {selectedNode ? (
                                <motion.div
                                    key={selectedNode.id}
                                    initial={shouldReduceMotion ? undefined : { opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <h3 className={`text-base font-bold mb-1 ${color.text}`}>
                                        {selectedNode.label}
                                    </h3>
                                    <p className="text-xs text-neutral-500 mb-3">{selectedNode.sublabel}</p>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{selectedNode.detail}</p>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center text-center gap-2 text-neutral-600">
                                    <ChevronRight size={24} aria-hidden="true" />
                                    <p className="text-sm">Click a node in the diagram to see details.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
