import React from "react";

function SuggestionChips() {
  return (
    <div className="z-20 flex w-full flex-row gap-2 overflow-x-scroll py-2">
      <div className="max-h-8 w-fit rounded-lg border-2 border-solid border-slate-200 p-1 text-sm text-slate-200">
        <p>Explain this problem...</p>
      </div>
      <div className=" max-h-8 rounded-lg border-2 border-solid border-slate-200 p-1 text-sm text-slate-200">
        <p>Help me visualize this...</p>
      </div>
      <div className="max-h-8 rounded-lg border-2 border-solid border-slate-200 p-1 text-sm text-slate-200">
        <p>Give me more examples...</p>
      </div>
    </div>
  );
}

export default SuggestionChips;
