import React, { Suspense, lazy } from "react";
import { LanguageProvider } from "./context/LanguageContext";

const Navbar = lazy(() => import("./components/Navbar"));
const DateTime = lazy(() => import("./components/DateTime"));
const Main = lazy(() => import("./components/Main"));
const Footer = lazy(() => import("./components/Footer"));

const App = () => (
  <LanguageProvider>
    <div className="min-h-screen flex flex-col bg-green-500">
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <Suspense fallback={null}>
        <div className="w-full flex justify-center py-2">
          <DateTime />
        </div>
      </Suspense>

      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={null}>
          <Main />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  </LanguageProvider>
);

export default App;
