// app/flow/FlowPage.tsx
import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "@/types/nodeTypes";
import ConnectionLine from "@/components/Flow/Line/CustomLine";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "starting", // starting node
    data: { label: "Starting Node" },
    position: { x: 400, y: 100 },
  },
];

const FlowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    if (type) {
      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type}` },
      };
      setNodes((nds) => nds.concat(newNode));
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <ReactFlowProvider>
      <div className="h-full">
        <div
          className="h-full bg-gray-50 border-l"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // connectionLineComponent={ConnectionLine as any}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowPage;
