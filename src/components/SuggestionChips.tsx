import React from "react";

function SuggestionChips() {
  return (
    <div className="z-20 mb-5 mr-3 flex w-full flex-row justify-center gap-2 overflow-x-scroll py-2">
      <div className="border-suggColors text-suggColors max-h-8 w-fit rounded-lg border-2 border-solid p-1 text-sm">
        <p>Explain this problem...</p>
      </div>
      <div className=" border-suggColors text-suggColors max-h-8 rounded-lg border-2 border-solid p-1 text-sm">
        <p>Help me visualize this...</p>
      </div>
      <div className="border-suggColors text-suggColors max-h-8 rounded-lg border-2 border-solid p-1 text-sm">
        <p>Give me more examples...</p>
      </div>
    </div>
  );
}

export default SuggestionChips;
