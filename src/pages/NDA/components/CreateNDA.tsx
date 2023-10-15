import { Title, Divider, TextInput, Select, Textarea } from "@mantine/core";
import { Upload } from "../../../components/DropZone/DropZone";

type Props = {
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateNDA = ({ setOpenReview }: Props) => {
  return (
    <div>
      <Title mt={90} mb={44} order={2} className="text-mainText">
        Fill the required fields:
      </Title>

      <div className="grid gap-[44px]">
        <div className="flex gap-[44px] flex-col sm:flex-row w-full">
          <TextInput
            required
            label="Company*"
            placeholder="Company name"
            className="w-full"
            size="md"
          />
          <TextInput
            required
            label="Name of initiator**"
            placeholder="James"
            className="w-full"
            size="md"
          />
        </div>

        <div className="flex gap-[44px] flex-col sm:flex-row w-full">
          <TextInput
            required
            label="Name of signee*"
            placeholder="Maria"
            className="w-full"
            size="md"
          />
          <TextInput
            required
            label="Governing Country*"
            placeholder="Poland"
            className="w-full"
            size="md"
          />
        </div>

        <div className="flex gap-[44px] flex-col sm:flex-row w-full">
          <TextInput
            required
            label="Governing State (optional)"
            placeholder="Maria"
            className="w-full"
            size="md"
          />
          <Select
            required
            size="md"
            label="Contract Type*"
            className="w-full"
            data={[
              {
                label: "NDA",
                value: "NDA",
              },
              {
                label: "NDA Two",
                value: "NDA Two",
              },
            ]}
          />
        </div>
      </div>

      <Divider my={70} />

      <Title order={2} mb={44} className="text-mainText">
        Special requests for the contact
      </Title>

      <Textarea label="" minRows={6} autosize />

      <Divider my={70} />

      <Title order={2} mb={44} className="text-mainText">
        Set your logo
      </Title>

      <div className="mt-10">
        <Upload />
      </div>

      <Divider my={70} />
      <div className="flex gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
        <button className="">Cancel</button>
        <button
          className="bg-[#00D8D8] w-[130px] p-3 rounded-lg font-semibold text-white"
          onClick={() => setOpenReview(true)}
        >
          Review NDA
        </button>
      </div>
    </div>
  );
};

export default CreateNDA;
