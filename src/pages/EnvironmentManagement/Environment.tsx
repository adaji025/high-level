import { AiOutlineCloudDownload } from "react-icons/ai";
import { Text, Divider, Button } from "@mantine/core";
import ContractTable from "./components/ContractTable";

const EnvironmentManagement = () => {
  return (
    <div>
      <div className="relative text-[24px] mdtext-[32px] text-mainText font-extrabold lg:text-[36px]">
        My <span className="font-black">your NDA</span>
        
      </div>
      <Text mt={24}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitationLorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation
      </Text>

      <Divider my={60} />

      <div className="flex gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
        <Button
          size="md"
          className="border border-gray-500 flex gap-3 text-black"
        >
          <AiOutlineCloudDownload size={20} />
          <div className="ml-2">Download all</div>
        </Button>
        <Button
          size="md"
          className="bg-[#00D8D8] rounded-lg font-semibold text-white flex"
        >
          Create new NDA
        </Button>
      </div>

      <ContractTable />
    </div>
  );
};

export default EnvironmentManagement;
