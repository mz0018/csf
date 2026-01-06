const Footer = () => (
  <footer
    className="py-4 sm:py-6 w-full border-t transition-colors duration-300 ease-in-out"
    style={{
      backgroundColor: "var(--bg-color)",
      color: "var(--text-color)",
      borderColor: "rgba(128,128,128,0.3)",
    }}
  >
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
      <p className="text-xs sm:text-sm lg:text-base transition-all duration-300 ease-in-out">
        &copy; {new Date().getFullYear()} Municipality of Solano. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
