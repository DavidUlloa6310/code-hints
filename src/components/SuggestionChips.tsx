import React from "react";

function SuggestionChips({
  sendChat,
}: {
  sendChat: (suggestion: string) => void;
}) {
  return (
    <div className="z-20 mb-3 flex w-full flex-row justify-center gap-2 overflow-x-scroll py-2">
      <button
        onClick={() => sendChat("Explain this problem")}
        className="border-suggColors text-suggColors max-h-8 w-fit rounded-lg border-2 border-solid p-1 text-sm transition ease-in-out hover:-translate-y-2"
      >
        <p>Explain this problem...</p>
      </button>
      <button
        onClick={() => sendChat("Help me visualize this")}
        className=" text-suggColors border-suggColors max-h-8 rounded-lg border-2 border-solid p-1 text-sm transition ease-in-out hover:-translate-y-2"
      >
        <p>Help me visualize this...</p>
      </button>
      <button
        onClick={() => sendChat("Give me more examples")}
        className="border-suggColors text-suggColors max-h-8 rounded-lg border-2 border-solid p-1 text-sm transition ease-in-out hover:-translate-y-2"
      >
        <p>Give me more examples...</p>
      </button>
    </div>
  );
}

export default SuggestionChips;
