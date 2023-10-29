import { BsFillPlayFill } from "react-icons/bs";
import { AutomationItemTypes } from "../../../types/automation";
import moment from "moment";
import { runAutomation } from "../../../services/automation";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";
import { useState, Fragment } from "react";
import { LoadingOverlay } from "@mantine/core";

type Props = {
  item: AutomationItemTypes;
};

const AutomationCards = ({ item }: Props) => {
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotification();
  const handleRunAutomation = () => {
    setLoading(true);

    runAutomation(item.id)
      .then(() => {
        toast.success("Automation completed");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="border min-w-[200px] w-full p-5 shadow rounded-md">
        <div className="flex justify-between gap-5">
          <h2 className="font-semibold capitalize">{item.name}</h2>
        </div>
        <div className="mt-6 flex items-center gap-3 text-xs">
          <h6 className="font-semibold">Status</h6>
          <div className="text-[#027A48]">{item.status}</div>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs">
          <h6 className="font-semibold">Last Run Date</h6>
          <div>
            {item.last_run ? moment(item.last_run).format("DD.MM.YY") : "---"}
          </div>
        </div>
        <div
          className="mt-10 flex gap-5 items-center cursor-pointer"
          onClick={handleRunAutomation}
        >
          <div className="h-[34px] w-[34px] rounded-full flex justify-center items-center border border-darkBlue">
            <BsFillPlayFill size={24} color="#E84E38" />
          </div>
          <div className="font-semibold">Start Automation</div>
        </div>
      </div>
    </Fragment>
  );
};

export default AutomationCards;
