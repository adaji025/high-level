import {
  Avatar,
  Divider,
  TextInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiUserBold } from "react-icons/pi";
import { Fragment, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EnvironmentType } from "../../types/environments";
import { RecentAutomationTypes } from "../../types/automation";
import useNotification from "../../hooks/useNotification";
import { getSingleEnv } from "../../services/environment";
import AutomationTable from "./components/AutomationTable";

const EnvironmentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);
  const [size] = useState(10);
  const [envList, setEnvList] = useState<RecentAutomationTypes | null>(null);
  const params = useParams();
  const id = params && Number(params.id);

  const navigate = useNavigate();
  const location = useLocation();

  const { handleError } = useNotification();

  const env: EnvironmentType = location?.state;

  console.log(env.agency);

  useEffect(() => {
    handleGetAutomation();
  }, []);

  const handleGetAutomation = () => {
    setLoading(true);

    if (id)
      getSingleEnv(id, page, size)
        .then((res: any) => {
          setEnvList(res.data);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
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

      <Divider my={45} />
      <div className="flex justify-between items-center mb-14">
        <h2 className="text-2xl font-semibold">Available automations</h2>
        <Button
          size="lg"
          leftSection={<PiUserBold />}
          className="bg-highLevelRed text-sm"
          onClick={() =>
            navigate(`/manage-environment/create-automation/${id}`, {
              state: env,
            })
          }
        >
          Add new Automation
        </Button>
      </div>

      <AutomationTable
        envList={envList}
        handleGetAutomation={handleGetAutomation}
      />
    </Fragment>
  );
};

export default EnvironmentDetails;
