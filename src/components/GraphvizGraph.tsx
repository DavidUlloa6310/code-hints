import dynamic from "next/dynamic";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });

export default function GraphvizGraph({ content }: { content: string }) {
  return <Graphviz dot={content} />;
}
