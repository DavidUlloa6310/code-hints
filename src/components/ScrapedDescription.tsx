import React from "react";

function ScrapedDescription({ content }: { content: string | undefined }) {
  return (
    <div
      className="scraped-description flex max-w-full flex-col flex-wrap overflow-x-auto overflow-y-auto break-all pb-4"
      dangerouslySetInnerHTML={
        content != null ? { __html: content } : { __html: "" }
      }
    />
  );
}

export default ScrapedDescription;
