import { useState } from "react";
import { Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FcCheckmark } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineArrowDown, AiOutlineDelete } from "react-icons/ai";
import ExcelIcon from "../../../assets/svgs/excel-icon.svg";
import {
  AutomationItemTypes,
  RecentAutomationTypes,
} from "../../../types/automation";
import moment from "moment";
import ConfirmDeleteAutomation from "../../Dashboard/components/ConfirmDeleteAutomation";
import { useNavigate } from "react-router-dom";

type Props = {
  envList: RecentAutomationTypes | null;
  handleGetAutomation: () => void;
};

const AutomationTable = ({
  envList: automation,
  handleGetAutomation,
}: Props) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [automationId, setAutomationId] = useState<number | null>(null);

  const navigate = useNavigate();

  const automationTableData = automation?.items;

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

  const latest = automation && automation?.items.slice(0, 6);

  console.log("latest", latest);
  return (
    <div>
      <ConfirmDeleteAutomation
        close={close}
        opened={opened}
        handleGetLatestAutomation={handleGetAutomation}
        automationId={automationId}
      />
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
                      Automation position
                      <AiOutlineArrowDown />
                    </div>
                  </div>
                </Table.Th>
                <Table.Th>Last Run</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {latest &&
                latest?.length > 0 &&
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
                    <Table.Td>
                      <div
                        className={`text-center p-1 whitespace-nowrap rounded-full w-[80px] flex items-center justify-center gap-1 ${
                          item.status === "completed"
                            ? "bg-[#ECFDF3] text-[#12B76A]"
                            : "bg-[#E7A94C]/10 text-[#E7A94C]"
                        }`}
                      >
                        {item.status === "signed" && <FcCheckmark />}
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
                          // onClick={() =>
                          //   navigate(
                          //     `/manage-environment/create-automation/${item.id}`
                          //   )
                          // }
                        />
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
    </div>
  );
};

export default AutomationTable;
