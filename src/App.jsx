import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

//password generator

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);
  //fn for generating password
  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    //condition check box
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "`!@#$%^&*()+=?/:;<=>?|~";

    for (let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length + 1);

      password = password + str.charAt(ind);
    }
    setPassword(password);
  }, [length, numAllowed, charAllowed, setPassword]);
  //fn for copying th password from input field
  const copyPasswordtoClipBoard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto px-4 py-3 mt-28 bg-gray-800 text-green-700 rounded-lg">
        <h1 className=" text-3xl text-white text-center my-4">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="w-full outline-none py-2 px-3"
            readOnly
            placeholder="password"
            ref={passwordRef}
            value={password}
          ></input>
          <button
            className="bg-blue-700 outline-none text-white rounded-e-lg hover:bg-blue-950"
            onClick={() => copyPasswordtoClipBoard()}
          >
            Copy
          </button>
        </div>
        <div className="flex text-wrap gap-x-2">
          <div className="flex flex-wrap items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              onChange={(evt) => {
                setLength(evt.target.value);
              }}
              value={length}
              min={8}
              max={100}
            ></input>
            <input
              type="number"
              min={8}
              max={20}
              value={length}
              onChange={(evt) => {
                setLength(evt.target.value);
              }}
              placeholder="length"
              className="outline-none rounded-md"
            ></input>
            <label>Length({length})</label>
            <input
              type="checkbox"
              id="num"
              onChange={() => setNumAllowed((prev) => !prev)}
              name="Numbers"
            ></input>
            <label htmlFor="num">Numbers</label>
            <input
              type="checkbox"
              id="char"
              onChange={() => setcharAllowed((prev) => !prev)}
              name="Characters"
            ></input>
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
