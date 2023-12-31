import { TextInput, LoadingOverlay, Button, Group } from "@mantine/core";
import AutomationCards from "./components/AutomationCards";
import { CiSearch } from "react-icons/ci";
import AutomationTable from "./components/AutomationTable";
import { useState, useEffect } from "react";
import { getAutomationList } from "../../services/automation";
import { RecentAutomationTypes } from "../../types/automation";
import useNotification from "../../hooks/useNotification";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [recentAutomation, setRecentAutomation] =
    useState<RecentAutomationTypes | null>(null);
  const [latestAutomation, setLatestAutomation] =
    useState<RecentAutomationTypes | null>(null);
  const [page] = useState(1);
  const [size] = useState(10);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetRecentAutomation();
    handleGetLatestAutomation();
  }, []);

  const handleGetRecentAutomation = () => {
    setLoading(true);

    getAutomationList("recent", page, size)
      .then((res: any) => {
        setRecentAutomation(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetLatestAutomation = () => {
    getAutomationList("latest", page, size)
      .then((res: any) => {
        setLatestAutomation(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const recent = recentAutomation && recentAutomation?.items.slice(0, 4);

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <div className="flex gap-5 flex-col sm:flex-row sm:items-center justify-between mb-5">
        <h2 className="font-bold text-lg sm:text-3xl order-2 sm:order-1">
          Recent automations
        </h2>
        <Group justify="flex-end" className="order-1 sm:order-2">
          <Button
            size="md"
            className="bg-highLevelRed text-sm"
          >
            Create User Credendentials
          </Button>
        </Group>
      </div>
      {recentAutomation && recentAutomation?.items.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {recent?.map((item) => (
            <AutomationCards
              key={item.id}
              item={item}
              callback={handleGetRecentAutomation}
            />
          ))}
        </div>
      )}

      {recent?.length === 0 && (
        <h2 className="text-center font-bold text-2xl text-black/80 mt-10">
          No Recent Automation
        </h2>
      )}

      <div className="flex justify-between mt-14">
        <div>
          <h3 className="font-semibold text-lg">Latest Automations</h3>
          <div className="text-secondaryText text-sm">
            Keep track of vendors and their security ratings.
          </div>
        </div>

        <TextInput
          size="md"
          leftSection={<CiSearch size={24} />}
          placeholder="Search"
        />
      </div>

      <div className="mt-5">
        <AutomationTable
          automation={latestAutomation}
          handleGetLatestAutomation={() => {
            handleGetRecentAutomation;
            handleGetLatestAutomation;
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
