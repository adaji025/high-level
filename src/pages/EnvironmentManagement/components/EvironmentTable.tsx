import { useState } from "react";
import { Table } from "@mantine/core";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const data: any = [
  {
    id: "1",
    name: "Contract example name",
    api_key: "mvon************GHKO",
  },
  {
    id: "2",
    name: "Contract example name",
    api_key: "mvon************GHKO",
  },
];

const EvironmentTable = () => {
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
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={isAllRowsSelected}
                      onChange={handleSelectAllRows}
                    />
                    Environment name
                  </div>
                </Table.Th>
                <Table.Th>Api Key</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        checked={isRowSelected(item.id)}
                        onChange={() => handleRowCheckboxChange(item.id)}
                      />
                      {item.name}
                    </div>
                  </Table.Td>
                  <Table.Td>{item.api_key}</Table.Td>
                  
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
      </div>
      <div className="flex justify-center items-center gap-1 mt-10">
        <div>Prev</div>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`h-[30px] w-[30px] rounded-md flex justify-center items-center cursor-pointer hover:bg-darkBlue hover:text-white ${
              index === 0 && "bg-darkBlue text-white"
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

export default EvironmentTable;
