import { Switch } from "@mantine/core";
import { BsFillPlayFill } from "react-icons/bs";

const AutomationCards = () => {
  return (
    <div className="border min-w-[200px] w-full p-5 shadow rounded-md">
      <div className="flex justify-between gap-5">
        <h2 className="font-semibold">Automation name</h2>
        <Switch defaultChecked />
      </div>
      <div className="mt-6 flex items-center gap-3 text-xs">
        <h6 className="font-semibold">Status</h6>
        <div className="text-[#027A48]">Completed</div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs">
        <h6 className="font-semibold">Last Run Date</h6>
        <div>10.10.23</div>
      </div>
      <div className="mt-10 flex gap-5 items-center">
        <div className="h-[34px] w-[34px] rounded-full flex justify-center items-center border border-darkBlue">
          <BsFillPlayFill size={24} color="#E84E38" />
        </div>
        <div className="font-semibold">Start Automation</div>
      </div>
    </div>
  );
};

export default AutomationCards;
