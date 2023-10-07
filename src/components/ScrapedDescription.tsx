import React from "react";

function ScrapedDescription({ content }: { content: string | undefined }) {
  return (
    <div
      className="flex flex-col flex-wrap overflow-auto break-all"
      dangerouslySetInnerHTML={
        content != null ? { __html: content } : { __html: "" }
      }
    />
  );
}

export default ScrapedDescription;
