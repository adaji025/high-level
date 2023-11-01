import { useState, useEffect } from "react";
import { Select, TextInput, Button } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { AutomationDetailsTypes } from "../../../../types/automation";
import {
  CustomFieldProps,
  EnvironmentType,
} from "../../../../types/environments";
import axios from "axios";

type Props = {
  autDetails: AutomationDetailsTypes | null;
  env: EnvironmentType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PIPELINE_URL = import.meta.env.VITE_APP_API_PIPELINE;

const DataPointsEdit = ({ autDetails, env, setLoading }: Props) => {
  const [customFields, setCustomFields] = useState<CustomFieldProps[] | null>(
    null
  );

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
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const form = useForm({
    initialValues: {
      datapoints: [
        {
          cell_location: "",
          field_id: "",
          key: randomId(),
        },
      ],
    },
  });

  const DataEndPointsFields = autDetails?.datapoints.map((item) => (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      className="flex gap-10 mb-5"
      key={item.id}
    >
      <Select
        className="w-1/2"
        size="lg"
        label="Field Name"
        placeholder="state"
        required
        data={customFields?.map((field) => ({
          label: field.name,
          value: field.id,
        }))}
        defaultValue={item.field_id}
      />

      <TextInput
        className="w-1/2"
        size="lg"
        label="Sheet Cell"
        placeholder="B6"
        required
        defaultValue={item.cell_location}
      />
    </form>
  ));

  return (
    <div>
      <div className="mt-10">
        {DataEndPointsFields}
        <Button size="md" className="bg-highLevelRed mt-10 mx-auto text-base">
          Update Datapoints
        </Button>
        {/* <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-highLevelRed mt-10 mx-auto text-base"
            onClick={() => {
              datapointsForm.insertListItem("datapoints", {
                cell_location: "",
                field_id: "",
                key: randomId(),
              });
            }}
          >
            Add custom data points
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default DataPointsEdit;
