import { TextInput } from "@mantine/core";
import AutomationCards from "./components/AutomationCards";
import { CiSearch } from "react-icons/ci";
import AutomationTable from "./components/AutomationTable";

const Dashboard = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl mb-5">Latest automations</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <AutomationCards />
        <AutomationCards />
        <AutomationCards />
        <AutomationCards />
      </div>

      <div className="mt-14">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg">Recent Automations</h3>
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
      </div>
      <div className="mt-5">
        <AutomationTable />
      </div>
    </div>
  );
};

export default Dashboard;
