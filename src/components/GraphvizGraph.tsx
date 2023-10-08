import dynamic from "next/dynamic";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });

export default function GraphvizGraph({ content }: { content: string }) {
  return (
    <div id="graphviz-graph" className="group flex w-full justify-center">
      <Graphviz dot={content} />
    </div>
  );
}
