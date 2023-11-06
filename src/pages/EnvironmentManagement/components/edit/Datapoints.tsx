import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { LoadingOverlay } from "@mantine/core";
import { toast } from "react-toastify";
import { BiTrash } from "react-icons/bi";
import { AutomationDetailsTypes } from "../../../../types/automation";
import { editDatapoints } from "../../../../services/automation";
import useNotification from "../../../../hooks/useNotification";
import {
  CustomFieldProps,
  EnvironmentType,
} from "../../../../types/environments";

const PIPELINE_URL = import.meta.env.VITE_APP_API_PIPELINE;

type Props = {
  autDetails: AutomationDetailsTypes | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  env: EnvironmentType;
};

const DataPoints = ({ autDetails, setLoading, env, loading }: Props) => {
  const [formValues, setFormValues] = useState([
    { field_id: "", cell_location: "", id: 0 },
  ]);
  const [customFields, setCustomFields] = useState<CustomFieldProps[] | null>(
    null
  );

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetCustomField();
  }, []);

  const handleGetCustomField = () => {
    axios
      .get(`${PIPELINE_URL}/custom-fields/`, {
        headers: {
          Authorization: `Bearer ${env?.api_key}`,
        },
      })
      .then((res) => {
        setCustomFields(res.data.customFields);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (autDetails) {
      setFormValues(
        autDetails.datapoints?.map((data) => ({
          field_id: data.field_id,
          cell_location: data.cell_location,
          id: data.id,
        }))
      );
    }
  }, [autDetails]);

  let handleChange = (i: any, e: any) => {
    let newFormValues = [...formValues];
    // @ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { field_id: "", cell_location: "", id: 0 }]);
  };

  let removeFormFields = (i: any) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

//   let handleSubmit = (event: any) => {
//     event.preventDefault();
//     alert(JSON.stringify(formValues));
//   };

    const submitUpdate = (event: any) => {
        event.preventDefault();
    setLoading(true);

    editDatapoints(formValues)
      .then(() => {
        toast.success("Datapoints updated successfully");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <form className="mt-10" onSubmit={submitUpdate}>
        {autDetails?.datapoints.map((element, index) => (
          <div className="flex flex-col sm:flex-row gap-10 mb-5" key={index}>
            <div className="w-full">
              <label className="block">Field name</label>
              <select
                // type="text"
                name="field_id"
                defaultValue={element.field_id}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 outline-none w-full rounded-md"
              >
                {customFields &&
                  customFields.map((field) => (
                    <option value={field.id}>{field.name}</option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block">Sheet Cell</label>
              <input
                type="text"
                name="cell_location"
                defaultValue={element.cell_location}
                onChange={(e) => handleChange(index, e)}
                className="border p-2 outline-none w-full rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <BiTrash
                size={24}
                className="cursor-pointer"
                onClick={() => removeFormFields(index)}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-5 mt-6">
          <button
            className="bg-green-500 py-2 px-6 font-bold text-white"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button
            className="bg-highLevelRed py-2 px-6 font-bold text-white"
            type="submit"
            // onClick={() => submitUpdate()}
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default DataPoints;
