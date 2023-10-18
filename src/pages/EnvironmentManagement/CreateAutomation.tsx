import { useState } from "react";
import {
  Avatar,
  TextInput,
  Divider,
  Select,
  Checkbox,
  Button,
  Textarea,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { CiSearch } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { Upload } from "./components/Upload";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");

  const icons = Quill.import("ui/icons");
  icons["undo"] = Undo;
  icons["redo"] = Redo;

  const form = useForm({
    initialValues: {
      name: "",
      pipeline: "",
      startStage: "",
      endStage: "",
      upload: "",
      dataEndPoints: [{ endPointName: "", cell_sheet: "", key: randomId() }],
    },
  });

  const DataEndPointsFields = form.values.dataEndPoints.map((item, index) => (
    <div className="flex gap-10 mb-5" key={item.key}>
      <TextInput
        className="w-1/2"
        size="lg"
        label="Field Name"
        placeholder="state"
        required
        {...form.getInputProps(`dataEndPoints.${index}.endPointName`)}
      />

      <TextInput
        className="w-1/2"
        size="lg"
        label="Sheet Cell"
        placeholder="B6"
        required
        {...form.getInputProps(`dataEndPoints.${index}.cell_sheet`)}
      />
    </div>
  ));

  return (
    <div>
      <div className="flex gap-5 flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Avatar size="xl">MK</Avatar>
          <div className="text-center sm:text-start">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">DStomps Agency</h1>
            <div className="flex items-center mt-2 gap-1 font-medium">
              Api key:
              <span className="text-secondaryText/50 text-sm">
                mvonsdnDNVNDSIVIKe29832
              </span>
              <GoCopy />
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

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className="mt-10">
          <h2 className="font-bold text-2xl">Create Automation</h2>
          <div className="flex gap-10 mt-10">
            <TextInput size="lg" label="Name" className="w-1/2" />
            <Select
              size="lg"
              label="Select pipeline"
              data={[
                { label: "one", value: "one" },
                { label: "two", value: "two" },
                { label: "three", value: "three" },
              ]}
              className="flex-1"
            />
          </div>
          <div className="flex gap-10 mt-10">
            <Select
              size="lg"
              label="Start stage"
              data={[
                { label: "one", value: "one" },
                { label: "two", value: "two" },
                { label: "three", value: "three" },
              ]}
              className="flex-1"
            />
            <Select
              size="lg"
              label="End stage"
              data={[
                { label: "one", value: "one" },
                { label: "two", value: "two" },
                { label: "three", value: "three" },
              ]}
              className="flex-1"
            />
          </div>
        </div>

        <Checkbox
          checked={checked}
          mt={40}
          label="Use Excel Sheet"
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />

        {checked && (
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

            <div className="mt-10">
              {DataEndPointsFields}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-highLevelRed mt-10 mx-auto text-base"
                  onClick={() =>
                    form.insertListItem("dataEndPoints", {
                      state: "",
                      cell_sheet: "",
                      key: randomId(),
                    })
                  }
                >
                  Add custom data points
                </Button>
              </div>
            </div>

            <div className="mt-14">
              <Textarea autosize minRows={6} className="!text-base" />
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
              <Button size="lg" className="bg-highLevelRed">Submit</Button>
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
