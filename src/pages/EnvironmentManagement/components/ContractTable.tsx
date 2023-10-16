import { useState } from "react";
import { Table } from "@mantine/core";
import { BsCloudDownload } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import { FcCheckmark } from "react-icons/fc";

const data: any = [
  {
    id: "1",
    name: "Contract example name",
    date: "Dec 1, 2022",
    status: "signed",
  },
  {
    id: "2",
    name: "Contract example name",
    date: "Dec 1, 2022",
    status: "not signed",
  },
];

const ContractTable = () => {
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
                    Element position
                  </div>
                </Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
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
                  <Table.Td>{item.date}</Table.Td>
                  <Table.Td>
                    <div
                      className={`text-center p-1 whitespace-nowrap rounded-full w-[80px] flex items-center gap-1 ${
                        item.status === "signed"
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
                      <BsCloudDownload size={20} color="#475467" />
                      <TbShare3 size={20} color="#475467" />
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

export default ContractTable;