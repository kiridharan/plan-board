import ConditionNode from "@/components/Flow/Nodes/ConditionalNode";
import InputNode from "@/components/Flow/Nodes/InputNode";
import StartingNode from "@/components/Flow/Nodes/StartingNode";
import SubtitleNode from "@/components/Flow/Nodes/SubtitleNode";
import { NodeTypes } from "reactflow";

export const nodeTypes: NodeTypes = {
  input: InputNode, // Register InputNode
  starting: StartingNode, // Register StartingNode
  subtitle: SubtitleNode, // Register SubtitleNode
  condition: ConditionNode, // Register ConditionNode
};
