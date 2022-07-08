import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";

export const PocPage: NextPage = () => {
  const [inputState, setInputState] = useState<string>("");
  const [externalData, setExternalData] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputState(e.target.value);

  const postData = async (input: string) => {
    if (!input) return;
    try {
      const response = await axios.post("http://localhost:4000/poc", {
        name: input,
      });
      setExternalData(JSON.stringify(response.data));
    } catch {
      setExternalData("Error: Something went wrong");
    }
  };

  return (
    <div>
      <div className="container">
        <p style={{ width: "365px", textAlign: "center" }}>
          This input is hooked up to a service.
        </p>
        <div className="flex-col align-center">
          <div className="flex-row">
            <input
              placeholder="Enter your name"
              type="text"
              value={inputState}
              onChange={handleChange}
            />
            <button disabled={!inputState} onClick={() => postData(inputState)}>
              Submit
            </button>
          </div>
          {externalData && <p>{externalData}</p>}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 1rem;
          padding: 1rem 1rem;
        }

        .flex-col {
          display: flex;
          flex-direction: column;
        }

        .align-center {
          align-items: center;
        }

        .flex-row {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default PocPage;
