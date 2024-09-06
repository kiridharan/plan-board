// app/flow/store/flowStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Node, Edge } from "reactflow";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  resetFlow: () => void;
}

const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      setNodes: (nodes: Node[]) => set({ nodes }),
      setEdges: (edges: Edge[]) => set({ edges }),
      updateNode: (id: string, data: Partial<Node>) => {
        const nodes = get().nodes.map((node) =>
          node.id === id ? { ...node, ...data } : node
        );
        set({ nodes });
      },
      updateEdge: (id: string, data: Partial<Edge>) => {
        const edges = get().edges.map((edge) =>
          edge.id === id ? { ...edge, ...data } : edge
        );
        set({ edges });
      },
      resetFlow: () => {
        set({ nodes: [], edges: [] });
        localStorage.removeItem("flow-storage");
      },
    }),
    {
      name: "flow-storage", // Key to store in localStorage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useFlowStore;
