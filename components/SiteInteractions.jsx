"use client";

import { useEffect } from "react";
import { initializeSite } from "../lib/site-interactions";

export default function SiteInteractions() {
  useEffect(() => initializeSite(), []);
  return null;
}
