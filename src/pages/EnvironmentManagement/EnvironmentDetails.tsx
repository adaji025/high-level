import {
  Avatar,
  Divider,
  TextInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GoCopy } from "react-icons/go";
import { PiUserBold } from "react-icons/pi";
import { Fragment, useEffect } from "react";
// import AutomationWarning from "./components/AutomationWarning";
import AutomationTable from "./components/AutomationTable";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAutomation } from "../../services/environment";
import { EnvironmentType } from "../../types/environments";

const EnvironmentDetails = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);
  const [size] = useState(10);
  const params = useParams();
  const id = params && params.id;

  const navigate = useNavigate();
  const location = useLocation();

  const env: EnvironmentType = location?.state;

  console.log(env.agency)

  useEffect(() => {
    handleGetAutomation();
  }, []);

  const handleGetAutomation = () => {
    setLoading(true);

    if (id)
      getAutomation(id, page, size)
        .then((res: any) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      {/* <AutomationWarning close={close} opened={opened} /> */}
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
              {/* <GoCopy /> */}
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
          onClick={() =>
            navigate(`/manage-environment/create-automation/${id}`, {state: env})
          }
        >
          Add new Automation
        </Button>
      </div>

      <AutomationTable />
    </Fragment>
  );
};

export default EnvironmentDetails;
