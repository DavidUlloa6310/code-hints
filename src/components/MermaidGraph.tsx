import { useEffect } from "react";
import mermaid from "mermaid";

interface MermaidGraphProps {
  graph: string;
}

export default function MermaidGraph({ graph }: MermaidGraphProps) {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });

    mermaid.setParseErrorHandler((err, hash) => {
      console.log(err);
      console.log(hash);
    });
  }, []);

  //   const graph = `
  //     graph TD
  //     Start --> Check_Sign
  //     Check_Sign --> |Positive| Calculate_Integer_Part
  //     Check_Sign --> |Negative| Add_Negative_Sign
  //     Calculate_Integer_Part --> Calculate_Remainder
  //     Calculate_Remainder --> |Remainder=0| Construct_Result
  //     Calculate_Remainder --> |Remainder>0| Initialize_Variables
  //     Initialize_Variables --> Calculate_Next_Digit
  //     Calculate_Next_Digit --> Update_Fractional_Part
  //     Update_Fractional_Part --> Calculate_Remainder
  //     Construct_Result --> Add_Repeating_Parentheses
  //     Add_Negative_Sign --> Calculate_Integer_Part
  //     Add_Repeating_Parentheses --> Return_Result
  //     Calculate_Integer_Part --> Return_Result
  //     `;

  return (
    <main className="">
      <pre className="mermaid">{graph}</pre>
    </main>
  );
}
