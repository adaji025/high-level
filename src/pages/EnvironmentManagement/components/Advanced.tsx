import { Upload } from "./Upload";
import {TextInput} from "@mantine/core"


const Advanced = () => {
  return (
    <div className="mt-14">
      <h3 className="text-xl font-bold">Upload your Excel file:</h3>
      <div className="mt-10">
        <Upload />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold">List of data points</h3>
          </div>
          <div className="flex">
              <TextInput placeholder="" />
          </div>
    </div>
  );
};

export default Advanced;
