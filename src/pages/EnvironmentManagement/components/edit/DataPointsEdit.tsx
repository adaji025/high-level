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
import { editDatapoints } from "../../../../services/automation";
import useNotification from "../../../../hooks/useNotification";
import { toast } from "react-toastify";

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

  const submit = (values: any) => {
    setLoading(true);

    const data: any = autDetails?.datapoints.map((item) => ({
      // cell_location: values.cell_location,
      // field_id: values.field_id,
      ...values.datapoints,
      id: item.id,
    }));
    console.log(data);
    editDatapoints(data)
      .then(() => {
        toast.success("Datapoint updated successfully");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DataEndPointsFields = form.values?.datapoints.map((item, index) => (
    <div className="flex gap-10 mb-5" key={item.field_id}>
      {autDetails?.datapoints.map((p) => (
        <>
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
            {...form.getInputProps(`datapoints.${index}.field_id`)}
            defaultValue={p.field_id}
            // onChange={(e: any) => setFieldId(e.target.value)}
          />

          <TextInput
            className="w-1/2"
            size="lg"
            label="Sheet Cell"
            placeholder="B6"
            required
            {...form.getInputProps(`datapoints.${index}.cell_location`)}
            defaultValue={p.cell_location}
            // onChange={(e: any) => setCellLocation(e.target.value)}
          />
        </>
      ))}
    </div>
  ));

  return (
    <div>
      <form className="mt-10" onSubmit={form.onSubmit(submit)}>
        {DataEndPointsFields}

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-highLevelRed mt-10 mx-auto text-base"
            onClick={() => {
              form.insertListItem("datapoints", {
                cell_location: "",
                field_id: "",
                key: randomId(),
              });
            }}
          >
            Add custom data points
          </Button>
        </div>
        <Button
          type="submit"
          size="md"
          className="bg-highLevelRed mt-10 mx-auto text-base"
        >
          Update Datapoints
        </Button>
      </form>
    </div>
  );
};

export default DataPointsEdit;
