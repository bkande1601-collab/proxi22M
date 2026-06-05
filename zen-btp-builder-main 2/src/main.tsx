import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ensureSeoDefaultsForApp } from "@/lib/seo-storage";

ensureSeoDefaultsForApp();

createRoot(document.getElementById("root")!).render(<App />);
