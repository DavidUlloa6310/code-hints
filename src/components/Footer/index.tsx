import Controls from "./Controls";
import Results from "./Results";
import { useState } from "react";

export default function Footer() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="absolute bottom-0 right-0 w-full bg-darkBlue px-6 py-3 font-bold text-nonWhite">
      <Controls {...{ showResults, setShowResults }} />
      <hr className="my-5" />
      <Results {...{ showResults, setShowResults }} />
    </div>
  );
}
