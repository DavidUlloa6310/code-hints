import React from "react";

interface ScrapedDescription {
  content: string | undefined;
}

function ScrapedDescription({ content }: ScrapedDescription) {
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
