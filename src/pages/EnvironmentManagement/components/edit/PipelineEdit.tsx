import { useEffect, useState } from "react";
import { AutomationDetailsTypes } from "../../../../types/automation";
import { TextInput, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EnvironmentType, PipelineTypes } from "../../../../types/environments";
import axios from "axios";
import { updatePipeline } from "../../../../services/automation";
import useNotification from "../../../../hooks/useNotification";
import { toast } from "react-toastify";

type Props = {
  autDetails: AutomationDetailsTypes | null;
  env: EnvironmentType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PIPELINE_URL = import.meta.env.VITE_APP_API_PIPELINE;
const PipelineEdit = ({ autDetails, env, setLoading }: Props) => {
  const [pipeline, setPipeline] = useState<PipelineTypes[] | null>(null);
  const [stages, setStages] = useState([]);

  const { handleError } = useNotification();

  useEffect(() => {
    if (autDetails) localStorage.setItem("savedName", autDetails?.name);
  }, []);

  const pname = localStorage.getItem("savedName");

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
      name: pname,
      pipeline: "",
      start_stage: "",
      end_stage: "",
      use_excel: false,
    },
  });

  useEffect(() => {
    pipeline?.find((p: any) => {
      if (p.id === form.values.pipeline) {
        setStages(p.stages);
      }
    });
  }, [form.values.pipeline]);

  const submit = (values: any) => {
    setLoading(true);

    if (autDetails)
      updatePipeline(autDetails?.id, values)
        .then(() => {
          toast.success("Pipeline updated successfully");
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => submit(values))}
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
          {...form.getInputProps("name")}
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
          {...form.getInputProps("pipeline")}
        />
      </div>
      <div className="flex gap-10 mt-10">
        <Select
          required
          size="lg"
          label="Start stage"
          data={stages?.map((stage: any) => ({
            label: stage.name,
            value: stage.id,
          }))}
          className="flex-1"
          defaultValue={autDetails?.start_stage}
          {...form.getInputProps("start_stage")}
        />
        <Select
          required
          size="lg"
          label="End stage"
          data={stages?.map((stage: any) => ({
            label: stage.name,
            value: stage.id,
          }))}
          className="flex-1"
          defaultValue={autDetails?.end_stage}
          {...form.getInputProps("end_stage")}
        />
      </div>
      <Button
        type="submit"
        size="md"
        className="bg-highLevelRed mt-10 mx-auto text-base"
      >
        Update Pipeline
      </Button>
    </form>
  );
};

export default PipelineEdit;
