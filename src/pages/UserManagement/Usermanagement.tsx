import {
  Button,
  Divider,
  Menu,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { BiFilter } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { PiUserBold } from "react-icons/pi";
import UserTable from "./components/UserTable";
import { useDisclosure } from "@mantine/hooks";
import AddUser from "./components/AddUser";
import { Fragment, useEffect, useState } from "react";
import { getUserList } from "../../services/user";
import useNotification from "../../hooks/useNotification";
import { UserState } from "../../types/user";

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserState | null>(null);
  const [page, setPage] = useState(1);
  const [size] = useState(5);

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetUsers();
  }, [page]);

  const handleGetUsers = () => {
    setLoading(true);
    getUserList(page, size)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <AddUser
        opened={opened}
        close={close}
        setUsers={setUsers}
        page={page}
        size={size}
      />
      <LoadingOverlay visible={loading} />
      <div>
        <div className="relative text-[24px] mdtext-[32px] text-mainText font-extrabold lg:text-[36px]">
          User Management
        </div>
        <Divider mt={16} />

        <div className="flex gap-10 flex-col sm:flex-row justify-between mt-14">
          <TextInput
            size="md"
            leftSection={<CiSearch size={24} />}
            placeholder="Search"
          />
          <div className="flex justify-end gap-5">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <Button
                  size="lg"
                  leftSection={<BiFilter size={24} />}
                  variant="outline"
                  className="text-darkBlue border-darkBlue"
                >
                  Filter By
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Date</Menu.Item>
                <Menu.Item>Size</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Button
              size="lg"
              leftSection={<PiUserBold />}
              className="bg-highLevelRed"
              onClick={open}
            >
              Add User
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <UserTable users={users} page={page} size={size} setPage={setPage} setUsers={setUsers} />
        </div>
      </div>
    </Fragment>
  );
};

export default UserManagement;
