import { useEffect, useState } from "react";
import { Pagination, Table, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FcCheckmark } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import {
  AiOutlineArrowDown,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import ExcelIcon from "../../../assets/svgs/excel-icon.svg";
import {
  AutomationItemTypes,
  RecentAutomationTypes,
} from "../../../types/automation";
import moment from "moment";
import ConfirmDeleteAutomation from "../../Dashboard/components/ConfirmDeleteAutomation";
import { useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { runAutomation } from "../../../services/automation";
import useNotification from "../../../hooks/useNotification";
import { toast } from "react-toastify";
import AutomationStatus from "./AutomationStatus";
import { EnvironmentType } from "../../../types/environments";

type Props = {
  envList: RecentAutomationTypes | null;
  handleGetAutomation: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  env: EnvironmentType;
  callback: () => void;
};

const AutomationTable = ({
  envList: automation,
  handleGetAutomation,
  page,
  setPage,
  env,
  callback
}: Props) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [automationId, setAutomationId] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);
  const [autDetails, setAutDetails] = useState<AutomationItemTypes | null>(
    null
  );

  const { handleError } = useNotification();
  const navigate = useNavigate();

  const automationTableData = automation?.items;

  useEffect(() => {
    if (automation)
      setTotalPages(Math.ceil(automation?.total / automation.size));
  }, [automation]);

  const isAllRowsSelected =
    automationTableData &&
    automationTableData?.length > 0 &&
    selectedRowIds.length === automationTableData.length;

  const handleRowCheckboxChange = (id: number) => {
    setSelectedRowIds((prevId) =>
      prevId.includes(id)
        ? prevId.filter((rowId) => rowId !== id)
        : [...prevId, id]
    );
  };

  const handleSelectAllRows = () => {
    if (automationTableData)
      if (isAllRowsSelected) {
        setSelectedRowIds([]);
      } else {
        setSelectedRowIds(automationTableData.map((row: any) => row.id));
      }
  };

  const isRowSelected = (id: number) => selectedRowIds.includes(id);

  const handleRunAutomation = (id: number) => {
    setLoading(true);

    runAutomation(id)
      .then(() => {
        toast.success("Automation has started");
        callback();
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <ConfirmDeleteAutomation
        close={close}
        opened={opened}
        handleGetLatestAutomation={handleGetAutomation}
        automationId={automationId}
      />

      <AutomationStatus
        close={() => setViewStatus(false)}
        viewStatus={viewStatus}
        autDetails={autDetails}
      />
      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] border border-gray-200">
        <Table.ScrollContainer minWidth={700}>
          <Table verticalSpacing={10} className="!rounded-xl">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="!rounded-tl-[15px]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isAllRowsSelected}
                      onChange={handleSelectAllRows}
                    />
                    <div className="flex items-center gap-1">
                      Automation name
                      <AiOutlineArrowDown />
                    </div>
                  </div>
                </Table.Th>
                <Table.Th>Last Run</Table.Th>
                <Table.Th>Run Times</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {automation &&
                automationTableData?.map((item: AutomationItemTypes) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isRowSelected(item.id)}
                          onChange={() => handleRowCheckboxChange(item.id)}
                        />
                        <div className="h-10 w-10 rounded-full bg-[#EAECF0] flex items-center justify-center">
                          <img
                            src={ExcelIcon}
                            alt="excel icon"
                            className="h-6 w-6"
                          />
                        </div>
                        {item.name}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      {item.last_run
                        ? moment(item.last_run).format("YY.MM.DD")
                        : "----"}
                    </Table.Td>
                    <Table.Td>{item.run_count}</Table.Td>
                    <Table.Td>
                      <div
                        className={`text-center font-semibold text-sm w-full md:w-4/6 p-2 whitespace-nowrap rounded-full flex items-center justify-center gap-1 ${
                          item.status === "SUCCESSFUL"
                            ? "bg-[#ECFDF3] text-[#12B76A]"
                            : item.status === "FAILED"
                            ? "bg-[#E7A94C]/10 text-red-500"
                            : item.status === "NOT_RUNNING"
                            ? "text-gray-500 bg-white"
                            : "bg-[#E7A94C]/10 text-[#E7A94C]"
                        }`}
                      >
                        {item.status === "SUCCESSFUL" && <FcCheckmark />}
                        {item.status}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex gap-5">
                        <div
                          onClick={() => {
                            setAutomationId(item.id);
                            open();
                          }}
                        >
                          <AiOutlineDelete size={20} color="#475467" />
                        </div>
                        <FiEdit2
                          size={20}
                          color="#475467"
                          onClick={() =>
                            navigate(
                              `/manage-environment/edit-automation/${item.id}`,
                              { state: { env, item } }
                            )
                          }
                        />
                        {item.status === "RUNNING" ? (
                          <AiOutlineEye
                            size={24}
                            onClick={() => {
                              setAutDetails(item);
                              setViewStatus(true);
                            }}
                          />
                        ) : (
                          <BsFillPlayFill
                            size={24}
                            color="#E84E38"
                            className="cursor-pointer"
                            onClick={() => handleRunAutomation(item.id)}
                          />
                        )}
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        {automation?.items.length === 0 && (
          <h2 className="text-center font-bold text-black/80 flex justify-center w-full mx-auto my-20">
            You have No Latest Automations
          </h2>
        )}
      </div>
      <div className="flex justify-center mt-10 text-darkBlue">
        <Pagination
          value={page}
          total={totalPages}
          siblings={1}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default AutomationTable;
