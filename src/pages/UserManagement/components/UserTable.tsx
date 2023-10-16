import { useState } from "react";
import { Table, Avatar } from "@mantine/core";
import { FcCheckmark } from "react-icons/fc";
import { FiEdit2 } from "react-icons/fi";
import { TbUserDown } from "react-icons/tb";

const data: any = [
  {
    id: "1",
    name: "Contract example name",
    email: "a@gmail.com",
    last_login: "10:30",
    created_at: "10:30",
    status: "active",
  },
  {
    id: "2",
    name: "Contract example name",
    email: "a@gmail.com",
    last_login: "10:30",
    created_at: "10:30",
    status: "pending",
  },
];

const UserTable = () => {
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
                    User name
                  </div>
                </Table.Th>
                <Table.Th>User email</Table.Th>
                <Table.Th>Last login</Table.Th>
                <Table.Th>Create at</Table.Th>
                <Table.Th> Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item: any) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isRowSelected(item.id)}
                        onChange={() => handleRowCheckboxChange(item.id)}
                      />
                      <div className="h-10 w-10 rounded-full bg-[#EAECF0] flex items-center justify-center">
                        <Avatar>MK</Avatar>
                      </div>
                      {item.name}
                    </div>
                  </Table.Td>
                  <Table.Td>{item.email}</Table.Td>
                  <Table.Td>{item.last_login}</Table.Td>
                  <Table.Td>{item.created_at}</Table.Td>
                  <Table.Td>
                    <div
                      className={`text-center p-1 whitespace-nowrap rounded-full w-[80px] flex justify-center items-center gap-1 ${
                        item.status === "active"
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
                      <TbUserDown size={20} color="#475467" />
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

export default UserTable;
