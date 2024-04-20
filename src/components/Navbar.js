import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-400 p-2">
      <div className="text-white text-lg font-bold">Your Logo</div>
      <div>
        <div className="flex items-center p-2 space-x-4">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-8 h-8 rounded-full bg-gray-500"
          />
          <div className="text-white">
            <h2 className="text-sm font-semibold">Leroy Jenkins</h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline"
              >
                View profile
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
