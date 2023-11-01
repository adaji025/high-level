import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, TextInput, Avatar, Divider } from "@mantine/core";
import { EnvironmentType } from "../../types/environments";
import { getAutomationDetails } from "../../services/automation";
import { CiSearch } from "react-icons/ci";
import { AutomationDetailsTypes } from "../../types/automation";
import PipelineEdit from "./components/edit/PipelineEdit";
import DataPointsEdit from "./components/edit/DataPointsEdit";
import EditMessages from "./components/edit/EditMessages";
import EditExcel from "./components/edit/EditExcel";

const EditAutomation = () => {
  const [loading, setLoading] = useState(false);

  const [autDetails, setAutDetails] = useState<AutomationDetailsTypes | null>(
    null
  );

  const location = useLocation();
  const env: EnvironmentType = location && location?.state.env;

  const aut: AutomationDetailsTypes = location && location.state.item;

  console.log("aut", autDetails);

  useEffect(() => {
    handleGetAutomationDetails();
  }, []);

  const handleGetAutomationDetails = () => {
    setLoading(true);

    getAutomationDetails(aut.id).then((res: any) => {
      setAutDetails(res.data);
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
      <Divider mt={16} label="Edit automation" />

      <PipelineEdit setLoading={setLoading} autDetails={autDetails} env={env} />

      <Divider label="Edit data point" my={54} />
      <DataPointsEdit
        env={env}
        setLoading={setLoading}
        autDetails={autDetails}
      />

      <Divider label="Re-upload Excel" my={54} />
      <EditExcel autDetails={autDetails} setLoading={setLoading} />
      
      <Divider label="Edit Messages" my={54} />
      <EditMessages />
    </div>
  );
};

export default EditAutomation;
