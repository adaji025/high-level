import { useEffect, useState } from "react";
import {
  Avatar,
  TextInput,
  Divider,
  Select,
  Checkbox,
  Button,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { CiSearch } from "react-icons/ci";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation,  } from "react-router-dom";
import {
  EnvironmentType,
  PipelineTypes,
  StageTypes,
  CustomFieldProps,
  AutomationResponseTypes,
} from "../../types/environments";
import axios from "axios";
import {
  createAutomation,
} from "../../services/automation";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { UploadExcel } from "./components/UploadExcel";

const PIPELINE_URL = import.meta.env.VITE_APP_API_PIPELINE;

const modules = {
  toolbar: [
    ["undo", "redo"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: "justify" }, { align: "center" }, { align: "right" }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
  ],
};

const CreateAutomation = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pipeline, setPipeline] = useState<PipelineTypes[] | null>(null);
  const [stages, setStages] = useState<StageTypes[] | null>(null);
  const [customFields, setCustomFields] = useState<CustomFieldProps[] | null>(
    null
  );
  const [automationResponse, setAutomationResponse] =
    useState<AutomationResponseTypes | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  


  const location = useLocation();
  const env: EnvironmentType = location && location?.state;

  const icons = Quill.import("ui/icons");
  icons["undo"] = Undo;
  icons["redo"] = Redo;

  const form = useForm({
    initialValues: {
      automation: {
        env_id: env.id,
        name: "",
        pipeline: "",
        start_stage: "",
        end_stage: "",
        use_excel: false,
      },
      datapoints: [
        {
          cell_location: "",
          field_id: "",
          key: randomId(),
        },
      ],
      messages: {
        sms: "",
        email: "",
      },
    },
  });

  useEffect(() => {
    handleGetPipeline();
    handleGetCustomField();
  }, []);

  useEffect(() => {
    pipeline?.find((p) => {
      if (p.id === form.values.automation.pipeline) {
        setStages(p.stages);
      }
    });
  }, [form.values.automation.pipeline]);

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

  const submit = (values: any) => {
    setLoading(true);

    createAutomation(values)
      .then((res: any) => {
        toast.success("Automation created successfully");
        setAutomationResponse(res.data);
        open();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DataEndPointsFields = form.values.datapoints.map((item, index) => (
    <div className="flex gap-10 mb-5" key={item.key}>
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
      />

      <TextInput
        className="w-1/2"
        size="lg"
        label="Sheet Cell"
        placeholder="B6"
        required
        {...form.getInputProps(`datapoints.${index}.cell_location`)}
      />
    </div>
  ));

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <UploadExcel
        opened={opened}
        close={close}
        automationResponse={automationResponse}
      />
      <div className="flex gap-5 flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Avatar size="xl">MK</Avatar>
          <div className="text-center sm:text-start">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              {env?.agency}
            </h1>
            <div className="flex items-center mt-2 gap-1 font-medium">
              Api key:
              <span className="text-secondaryText/50 text-sm">
                {env?.api_key.substring(0, 30)}
              </span>
            </div>
          </div>
        </div>
        <TextInput
          size="lg"
          leftSection={<CiSearch size={24} />}
          placeholder="Search"
        />
      </div>
      <Divider mt={16} />

      <form
        onSubmit={form.onSubmit((values) =>
          submit({
            ...values,
            automation: { ...values.automation, env_id: env.id },
            messages: { ...values.messages, email },
          })
        )}
      >
        <div className="mt-10">
          <h2 className="font-bold text-2xl">Create Automation</h2>
          <div className="flex gap-10 mt-10">
            <TextInput
              size="lg"
              label="Name"
              className="w-1/2"
              {...form.getInputProps("automation.name")}
            />
            <Select
              size="lg"
              label="Select pipeline"
              data={pipeline?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              className="flex-1"
              {...form.getInputProps("automation.pipeline")}
            />
          </div>
          <div className="flex gap-10 mt-10">
            <Select
              size="lg"
              label="Start stage"
              data={stages?.map((stage) => ({
                label: stage.name,
                value: stage.id,
              }))}
              className="flex-1"
              {...form.getInputProps("automation.start_stage")}
            />
            <Select
              size="lg"
              label="End stage"
              data={stages?.map((stage) => ({
                label: stage.name,
                value: stage.id,
              }))}
              className="flex-1"
              {...form.getInputProps("automation.end_stage")}
            />
          </div>
        </div>

        <Checkbox
          checked={form.values.automation.use_excel}
          mt={40}
          label="Use Excel Sheet"
          {...form.getInputProps("automation.use_excel")}
        />

        {form.values.automation.use_excel && (
          <div className="mt-14">
            <h3 className="text-xl font-bold">Upload your Excel file:</h3>

            <div className="mt-10">
              <h3 className="text-xl font-bold">List of data points</h3>
            </div>

            <div className="mt-10">
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
            </div>

            <div className="mt-14">
              <Textarea
                autosize
                minRows={6}
                className="!text-base"
                {...form.getInputProps("messages.sms")}
              />
            </div>

            <div className="mt-14 mb-32 md:mb-24">
              <ReactQuill
                theme="snow"
                placeholder="type here ...."
                value={email}
                onChange={setEmail}
                modules={modules}
                className="h-[30vh] "
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="bg-highLevelRed">
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateAutomation;

const Undo = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
</svg>`;

const Redo = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
</svg>`;
