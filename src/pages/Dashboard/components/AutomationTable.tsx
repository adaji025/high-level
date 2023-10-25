import { useState } from "react";
import { Table } from "@mantine/core";
import { FcCheckmark } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineArrowDown, AiOutlineDelete } from "react-icons/ai";
import ExcelIcon from "../../../assets/svgs/excel-icon.svg";

// type Props = {
//   latestAutomation: any[]
// }

const data: any[] = []
 

const AutomationTable = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  console.log("selectedRowIds", selectedRowIds);

  const isAllRowsSelected =
    data.length > 0 && selectedRowIds.length === data.length;

  const handleRowCheckboxChange = (id: string) => {
    setSelectedRowIds((prevId) =>
      prevId.includes(id)
        ? prevId.filter((rowId) => rowId !== id)
        : [...prevId, id]
    );
  };

  const handleSelectAllRows = () => {
    if (isAllRowsSelected) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(data.map((row: any) => row.id));
    }
  };

  const isRowSelected = (id: string) => selectedRowIds.includes(id);

  return (
    <div>
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
              {data.length > 0 &&
                data.map((item: any) => (
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
                    <Table.Td>{item.date}</Table.Td>
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
                        <AiOutlineDelete size={20} color="#475467" />
                        <FiEdit2 size={20} color="#475467" />
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        {data.length === 0 && (
          <h2 className="text-center font-bold text-black/80 flex justify-center w-full mx-auto my-20">
            You have No Latest Automations
          </h2>
        )}
      </div>
      <div className="flex justify-center items-center gap-1 mt-10">
        <div>Prev</div>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`h-[30px] w-[30px] rounded-md flex justify-center items-center cursor-pointer hover:bg-darkBlue ${
              index === 0 && "bg-darkBlue"
            }`}
          >
            {" "}
            {index === 4 ? "..." : index + 1}{" "}
          </div>
        ))}
        <div>Next</div>
      </div>
    </div>
  );
};

export default AutomationTable;
