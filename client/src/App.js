import React, { useState, useRef } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const inputRef = useRef(null);

  const fetchDataFromGoogleSheets = async (param) => {
    try {
      const response = await axios.get(`/api/data?param=${param}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
    inputRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const param = event.target.elements.param.value;
    fetchDataFromGoogleSheets(param);
    event.target.reset();
  };

  return (
    <div className="container flex flex-col justify-center items-center full-screen mx-auto">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="block rounded-md border border-gray-300 focus:border-orange-600 outline-none shadow-lg text-4xl py-1 transition-colors duration-300"
          type="text"
          name="param"
          autoFocus
          placeholder="Enter id"
          ref={inputRef}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-5 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
          type="submit">
          Submit
        </button>
      </form>
      {data && (
        <p className="font-sans uppercase mt-5 text-2xl">{`${data}!`}</p>
      )}
    </div>
  );
}

export default App;
