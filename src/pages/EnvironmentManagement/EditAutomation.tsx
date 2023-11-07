import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, TextInput, Avatar, Tabs } from "@mantine/core";
import { EnvironmentType } from "../../types/environments";
import { getAutomationDetails } from "../../services/automation";
import { CiSearch } from "react-icons/ci";
import { AutomationDetailsTypes } from "../../types/automation";
import PipelineEdit from "./components/edit/PipelineEdit";
// import DataPointsEdit from "./components/edit/DataPointsEdit";
import EditMessages from "./components/edit/EditMessages";
import EditExcel from "./components/edit/EditExcel";
import useNotification from "../../hooks/useNotification";
import DataPoints from "./components/edit/Datapoints";

const EditAutomation = () => {
  const [loading, setLoading] = useState(false);

  const [autDetails, setAutDetails] = useState<AutomationDetailsTypes | null>(
    null
  );

  const { handleError } = useNotification();

  const location = useLocation();
  const env: EnvironmentType = location && location?.state.env;

  const aut: AutomationDetailsTypes = location && location.state.item;

  useEffect(() => {
    handleGetAutomationDetails();
  }, []);

  const handleGetAutomationDetails = () => {
    setLoading(true);

    getAutomationDetails(aut.id)
      .then((res: any) => {
        setAutDetails(res.data);
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
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

      <Tabs mt={52} defaultValue="pipeline">
        <Tabs.List className="overflow-auto ">
          <Tabs.Tab value="pipeline">Edit Pipeline</Tabs.Tab>
          <Tabs.Tab value="datapoints">Edit Datapoints</Tabs.Tab>
          <Tabs.Tab value="messages">Edit messages</Tabs.Tab>
          <Tabs.Tab value="excel">Re-upload Excel</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pipeline">
          <PipelineEdit
            setLoading={setLoading}
            autDetails={autDetails}
            env={env}
          />
        </Tabs.Panel>

        <Tabs.Panel value="datapoints">
          {autDetails?.datapoints && (
            <DataPoints
              env={env}
              loading={loading}
              setLoading={setLoading}
              autDetails={autDetails}
              callback={handleGetAutomationDetails}
            />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          {autDetails?.messages && (
            <EditMessages autDetails={autDetails} setLoading={setLoading} />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="excel">
          <EditExcel autDetails={autDetails} setLoading={setLoading} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default EditAutomation;
