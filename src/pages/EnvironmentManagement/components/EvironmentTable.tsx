import { useState, useEffect } from "react";
import { Table, Pagination, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { EnvironmentState, EnvironmentType } from "../../../types/environments";
import AddEnvironment from "./AddEnvironment";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteEnv from "./ConfirmDeleteEnv";

type EnvironmentProps = {
  environments: EnvironmentState | null;
  setEnvironments: React.Dispatch<
    React.SetStateAction<EnvironmentState | null>
  >;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleGetEnvironments: () => void;
};

const EvironmentTable = ({
  environments,
  page,
  setPage,
  setEnvironments,
  handleGetEnvironments,
}: EnvironmentProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState<EnvironmentType | undefined>(undefined);
  const [loading] = useState(false);
  const [envId, setEnvId] = useState<number | null>(null);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

 
  useEffect(() => {
    if (environments) setTotalPages(Math.ceil(environments?.total / environments.size));
  }, [environments]);



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
      <LoadingOverlay visible={loading} />
      <AddEnvironment
        opened={opened}
        close={close}
        edit={edit}
        setEnvironments={setEnvironments}
      />
      <ConfirmDeleteEnv
        openDelModal={openDelModal}
        close={() => setOpenDelModal(false)}
        envId={envId}
        handleGetEnvironments={handleGetEnvironments}
      />

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
                  <Table.Td
                    onClick={() =>
                      navigate(`/manage-environment/${item.id}`, {
                        state: item,
                      })
                    }
                    className="cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        checked={isRowSelected(item.id)}
                        onChange={() => handleRowCheckboxChange(item.id)}
                      />
                      {item.agency}
                    </div>
                  </Table.Td>
                  <Table.Td
                    onClick={() =>
                      navigate(`/manage-environment/${item.id}`, {
                        state: item,
                      })
                    }
                    className="cursor-pointer"
                  >
                    {item.api_key.substring(0, 30)}
                  </Table.Td>

                  <Table.Td
                    className="cursor-pointer"
                    onClick={() => setEdit(item)}
                  >
                    <div className="flex gap-5">
                      <AiOutlineDelete
                        size={20}
                        color="#475467"
                        onClick={() => {
                          setEnvId(item.id);
                          setOpenDelModal(true);
                        }}
                      />
                      <FiEdit2 size={20} color="#475467" onClick={open} />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        {list?.length === 0 && (
          <h2 className="text-2xl font-bold text-center my-10">
            You have no Environment
          </h2>
        )}
        {!list && (
          <h2 className="text-2xl font-bold text-center my-10">
            You have no Environment
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

export default EvironmentTable;
