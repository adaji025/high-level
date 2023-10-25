import { TextInput, LoadingOverlay } from "@mantine/core";
import AutomationCards from "./components/AutomationCards";
import { CiSearch } from "react-icons/ci";
import AutomationTable from "./components/AutomationTable";
import { useState, useEffect } from "react";
import { getAutomationList } from "../../services/automation";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [recentAutomation, setRecentAutomation] = useState([]);
  const [latestAutomation, setLatestAutomation] = useState([]);
  const [page] = useState(1);
  const [size] = useState(10);

  useEffect(() => {
    handleGetRecentAutomation();
    handleGetLatestAutomation();
  }, []);

  const handleGetRecentAutomation = () => {
    setLoading(true);

    getAutomationList("recent", page, size)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetLatestAutomation = () => {
    getAutomationList("latest", page, size).then((res: any) => {
      console.log(res);
    });
  };

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <h2 className="font-bold text-3xl mb-5">Recent automations</h2>
      {recentAutomation.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <AutomationCards key={index} />
          ))}
        </div>
      )}

      {recentAutomation.length === 0 && (
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
        <AutomationTable />
      </div>
    </div>
  );
};

export default Dashboard;
