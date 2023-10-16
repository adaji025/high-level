import { Button, Divider, Menu, TextInput } from "@mantine/core";
import { BiFilter } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { PiUserBold } from "react-icons/pi";
import UserTable from "./components/UserTable";

const UserManagement = () => {
  return (
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
              <Button size="lg" leftSection={<BiFilter size={24} />} variant="outline" className="text-darkBlue border-darkBlue">Filter By</Button>
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
          >
            Add User
          </Button>
        </div>
      </div>

      <div className="mt-14">
        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
