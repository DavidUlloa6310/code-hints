// MermaidGraph.tsx
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidGraphProps {
  graph: string;
}

const MermaidGraph: React.FC<MermaidGraphProps> = ({ graph }) => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderGraph = async () => {
      if (graphRef.current) {
        try {
          const renderResult = await mermaid.mermaidAPI.render(
            "graphDiv",
            graph,
          );
          if (graphRef.current) {
            // additional check in case component unmounted
            graphRef.current.innerHTML = renderResult.svg; // adjusted line
          }
        } catch (error) {
          console.error("Mermaid graph rendering failed:", error);
        }
      }
    };

    renderGraph().catch((error) => {
      console.error("Error in renderGraph:", error);
    });
  }, [graph]);

  return <div ref={graphRef} />;
};

export default MermaidGraph;
