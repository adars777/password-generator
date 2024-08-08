import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef
  const passwordRef = useRef();

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPassword = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(Password);
  };

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <>
      <div className=" selection:bg-blue-200 w-full max-w-md mx-auto shadow-xl rounded-md px-4 py-10 m-8 text-blue-600 bg-gray-500">
        <h1 className="text-center text-3xl text-white mb-4">
          Password Generator
        </h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            readOnly
            ref={passwordRef}
            className="outline-none w-full py-2 px-4"
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 px-4 text-white font-semibold"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-3">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              onClick={(e) => {
                setLength(e.target.value);
              }}
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
            />
            <label className="font-bold text-green-400">Length:{length}</label>
          </div>

          {/* numbers */}
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
              value={numberAllowed}
              className="cursor-pointer"
            />
            <label className="font-bold text-green-400">Numbers</label>
          </div>
          {/* characters allowed or not  */}
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              min={8}
              max={30}
              value={charAllowed}
              className="cursor-pointer"
            />
            <label className="font-bold text-green-400">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
