import { Avatar, Divider, TextInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSearch } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { PiUserBold } from "react-icons/pi";
import { Fragment } from "react";
import AutomationWarning from "./components/AutomationWarning";
import AutomationTable from "./components/AutomationTable";

const EnvironmentDetails = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Fragment>
      <AutomationWarning close={close} opened={opened} />
      <div className="flex gap-5 flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Avatar size="xl">MK</Avatar>
          <div className="text-center sm:text-start">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              DStomps Agency
            </h1>
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

      <Divider my={45} />
      <div className="flex justify-between items-center mb-14">
        <h2 className="text-2xl font-semibold">Available automations</h2>
        <Button
          size="lg"
          leftSection={<PiUserBold />}
          className="bg-highLevelRed text-sm"
          onClick={open}
        >
          Add new Automation
        </Button>
      </div>

      <AutomationTable />
    </Fragment>
  );
};

export default EnvironmentDetails;
