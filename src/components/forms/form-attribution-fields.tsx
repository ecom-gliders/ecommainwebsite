"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Captures the page the visitor is on when they submit a form/funnel.
 * Sent as hidden fields → Discord + team email (“Submitted from”).
 */
export function FormAttributionFields() {
  const pathname = usePathname();
  const [pageUrl, setPageUrl] = useState("");
  const [pageReferrer, setPageReferrer] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
    setPageReferrer(document.referrer || "");
  }, [pathname]);

  return (
    <>
      <input type="hidden" name="pagePath" value={pathname || ""} readOnly />
      <input
        type="hidden"
        name="pageUrl"
        value={pageUrl || pathname || ""}
        readOnly
      />
      <input type="hidden" name="pageReferrer" value={pageReferrer} readOnly />
    </>
  );
}
