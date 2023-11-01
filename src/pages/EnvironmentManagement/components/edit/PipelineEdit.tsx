import { useEffect, useState } from "react";
import { AutomationDetailsTypes } from "../../../../types/automation";
import { TextInput, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EnvironmentType, PipelineTypes } from "../../../../types/environments";
import axios from "axios";

type Props = {
  autDetails: AutomationDetailsTypes | null;
  env: EnvironmentType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PIPELINE_URL = import.meta.env.VITE_APP_API_PIPELINE;
const PipelineEdit = ({ autDetails, env, setLoading }: Props) => {
  const [pipeline, setPipeline] = useState<PipelineTypes[] | null>(null);

  let stages: any[] = [];

  useEffect(() => {
    handleGetPipeline();
  }, []);

  const handleGetPipeline = () => {
    setLoading(true);

    axios
      .get(`${PIPELINE_URL}/pipelines/`, {
        headers: {
          Authorization: `Bearer ${env?.api_key}`,
        },
      })
      .then((res) => {
        setPipeline(res.data.pipelines);
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
      name: "string",
      pipeline: "string",
      start_stage: "string",
      end_stage: "string",
      use_excel: true,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      className="mt-10"
    >
      <div className="flex gap-10 mt-10">
        <TextInput
          required
          size="lg"
          label="Name"
          placeholder="Type name"
          className="flex-1"
          defaultValue={autDetails?.name}
        />
        <Select
          required
          size="lg"
          label="Select pipeline"
          data={pipeline?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          className="flex-1"
          defaultValue={autDetails?.pipeline}
        />
      </div>
      <div className="flex gap-10 mt-10">
        <Select
          required
          size="lg"
          label="Start stage"
          data={pipeline?.map((stage) => ({
            label: stage.name,
            value: stage.id,
          }))}
          className="flex-1"
          defaultValue={autDetails?.start_stage}
        />
        <Select
          required
          size="lg"
          label="End stage"
          data={stages?.map((stage) => ({
            label: stage.name,
            value: stage.id,
          }))}
          className="flex-1"
          defaultValue={autDetails?.end_stage}
        />
      </div>
      <Button size="md" className="bg-highLevelRed mt-10 mx-auto text-base">
        Update Pipeline
      </Button>
    </form>
  );
};

export default PipelineEdit;
