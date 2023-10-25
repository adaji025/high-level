import { useState, useMemo, useEffect } from "react";
import { Table, Avatar, Pagination, Button } from "@mantine/core";
import { UserState, UserTypes } from "../../../types/user";
import moment from "moment";
import { useDisclosure } from "@mantine/hooks";
import ConfirmStatus from "./ConfirmStatus";

type Props = {
  users: UserState | null;
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setUsers: React.Dispatch<React.SetStateAction<UserState | null>>
};

const UserTable = ({ users, page, setPage, setUsers }: Props) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [count, setCount] = useState(1);
  const [user, setUser] = useState<UserTypes | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const userList = useMemo(() => users?.items, [users]);
  useEffect(() => {
    if (users) setCount(users?.count);
  }, [users]);

  console.log(userList);

  // console.log("selectedRowIds", selectedRowIds);

  const isAllRowsSelected =
    userList &&
    userList.length > 0 &&
    selectedRowIds.length === userList.length;

  const handleRowCheckboxChange = (id: number) => {
    setSelectedRowIds((prevId) =>
      prevId.includes(id)
        ? prevId.filter((rowId) => rowId !== id)
        : [...prevId, id]
    );
  };

  const handleSelectAllRows = () => {
    if (userList) {
      if (isAllRowsSelected) {
        setSelectedRowIds([]);
      } else {
        setSelectedRowIds(userList.map((row: any) => row.id));
      }
    }
  };

  const isRowSelected = (id: number) => selectedRowIds.includes(id);

  return (
    <div>
      <ConfirmStatus close={close} opened={opened} user={user} setUsers={setUsers}  />
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
              {userList?.map((item: UserTypes) => (
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
                      {item.first_name} {item.last_name}
                    </div>
                  </Table.Td>
                  <Table.Td>{item.email}</Table.Td>
                  <Table.Td>
                    {item.last_login
                      ? moment(item.last_login).format("YYYY-MM-DD HH:mm:ss")
                      : "- - -"}
                  </Table.Td>
                  <Table.Td>
                    {moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </Table.Td>
                  <Table.Td>
                    <div
                      className={`text-center p-1 whitespace-nowrap rounded-full w-[80px] flex justify-center items-center gap-2 font-semibold ${
                        item.is_active
                          ? "bg-[#ECFDF3] text-[#12B76A]"
                          : "bg-[#E7A94C]/10 text-[#E7A94C]"
                      }`}
                    >
                      {item.is_active && (
                        <div
                          className={`h-[6px] w-[6px] rounded-full ${
                            item.is_active ? "bg-[#12B76A]" : "bgtext-[#E7A94C]"
                          }`}
                        />
                      )}
                      {item.is_active ? "Active" : "Disabled"}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex gap-5">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          setUser(item);
                          open();
                        }}
                        className="text-xs"
                      >
                        {item.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
      <div className="flex justify-center mt-10 text-darkBlue">
        <Pagination
          value={page}
          total={count}
          siblings={1}
          onChange={setPage}
          color="blue"
          className="!text-darkBlue"
        />
      </div>
    </div>
  );
};

export default UserTable;
