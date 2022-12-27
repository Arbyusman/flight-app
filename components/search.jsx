import { useState } from "react";

function FormInput() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server or perform some other action
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-none mx-auto mt-4">
      <div className="flex flex-col mb-4">
        <label className="w-1/3 font-bold text-gray-500">Name</label>
        <input
          className="w-2/3 border-2 border-gray-200 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="w-1/3 font-bold text-gray-500">Email</label>
        <input
          className="w-2/3 border-2 border-gray-200 rounded px-4 py-2 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <div className="w-12"></div>
        <button
          className="w-2/3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormInput;