import { CiSearch } from "react-icons/ci";
import { PiUserBold } from "react-icons/pi";
import { Divider, Button, TextInput } from "@mantine/core";
import EvironmentTable from "./components/EvironmentTable";
import { useDisclosure } from "@mantine/hooks";
import { Fragment } from "react";
import AddEnvironment from "./components/AddEnvironment";

const EnvironmentManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <AddEnvironment opened={opened} close={close} />
      <div>
        <div className="relative text-[24px] md:text-[32px] text-mainText font-extrabold lg:text-[36px]">
          Manage Environments
        </div>
        <Divider mt={16} />

        <div className="flex gap-10 flex-col sm:flex-row justify-between my-14">
          <div>
            <h2 className="font-semibold text-lg">List of all Environments</h2>
            <div className="text-sm text-secondaryText mt-2">
              Lorem ipsum example text will be written here
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-5">
            <TextInput
              size="lg"
              leftSection={<CiSearch size={24} />}
              placeholder="Search"
            />
            <div className="flex justify-end mt-5 sm:mt-[unset]">
              <Button
                size="lg"
                leftSection={<PiUserBold />}
                className="bg-highLevelRed text-sm"
                onClick={open}
              >
                Add new Environments
              </Button>
            </div>
          </div>
        </div>

        <EvironmentTable />
      </div>
    </Fragment>
  );
};

export default EnvironmentManagement;
