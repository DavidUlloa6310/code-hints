import React from "react";

function ScrapedDescription({ content }: { content: string | undefined }) {
  return (
    <div
      className="scraped-description flex flex-col flex-wrap break-all pb-4"
      dangerouslySetInnerHTML={
        content != null ? { __html: content } : { __html: "" }
      }
    />
  );
}

export default ScrapedDescription;
