import { useState, useEffect } from "react";
import { Table, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { EnvironmentState, EnvironmentType } from "../../../types/environments";
import AddEnvironment from "./AddEnvironment";

type EnvironmentProps = {
  environments: EnvironmentState | null;
  setEnvironments: React.Dispatch<
    React.SetStateAction<EnvironmentState | null>
  >;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const EvironmentTable = ({ environments, page, setPage, setEnvironments }: EnvironmentProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [count, setCount] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<EnvironmentType | undefined>(undefined);

  console.log(page);

  useEffect(() => {
    if (environments) setCount(environments?.count);
  }, [environments]);

  // console.log("selectedRowIds", selectedRowIds);

  const list = environments?.items;

  const isAllRowsSelected =
    list && list?.length > 0 && selectedRowIds.length === list.length;

  const handleRowCheckboxChange = (id: number) => {
    setSelectedRowIds((prevId) =>
      prevId.includes(id)
        ? prevId.filter((rowId) => rowId !== id)
        : [...prevId, id]
    );
  };

  const handleSelectAllRows = () => {
    if (list)
      if (isAllRowsSelected) {
        setSelectedRowIds([]);
      } else {
        setSelectedRowIds(list.map((row: any) => row.id));
      }
  };

  const isRowSelected = (id: number) => selectedRowIds.includes(id);

  return (
    <div>
      <AddEnvironment opened={opened} close={close} edit={edit} setEnvironments={setEnvironments} />
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
              {list?.map((item: EnvironmentType) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        checked={isRowSelected(item.id)}
                        onChange={() => handleRowCheckboxChange(item.id)}
                      />
                      {item.agency}
                    </div>
                  </Table.Td>
                  <Table.Td>{item.api_key.substring(0, 30)}</Table.Td>

                  <Table.Td className="cursor-pointer"
                  onClick={() => setEdit(item)}>
                    <div className="flex gap-5">
                      <AiOutlineDelete size={20} color="#475467" />
                      <FiEdit2 size={20} color="#475467" onClick={open} />
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
          className="!text-darkBlue"
        />
      </div>
    </div>
  );
};

export default EvironmentTable;
