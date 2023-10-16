import { Button, Divider, PasswordInput } from "@mantine/core";

const Password = () => {
  return (
    <div>
      <h2 className="font-semibold text-lg">Password</h2>
      <div className="text-sm text-secondaryText mt-2">
        Please enter your current password to change your password.
      </div>
      <div className="py-10 mt-10 border-t">
        <div className=" flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
          <div className="w-2/5">
            <div className="font-semibold">Current password</div>
          </div>
          <PasswordInput placeholder="********" size="lg" className="flex-1" />
        </div>
      </div>

      <div className="py-10 border-t">
        <div className="mt-10 flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
          <div className="w-2/5">
            <div className="font-semibold">New password</div>
          </div>
          <PasswordInput placeholder="********" size="lg" className="flex-1" />
        </div>
      </div>

      <div className="py-10 border-t">
        <div className="mt-10 flex gap-5 flex-col sm:flex-row justify-between md:w-4/5">
          <div className="w-2/5">
            <div className="font-semibold">Confirm password</div>
          </div>
          <PasswordInput placeholder="********" size="lg" className="flex-1" />
        </div>
      </div>

      <Divider mt={100} />
      <div className="flex mt-10 gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
        <Button
          size="lg"
          variant="outline"
          className="font-semibold flex text-darkBlue border-darkBlue"
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="bg-darkBlue rounded-lg font-semibold text-white flex"
        >
          Update password
        </Button>
      </div>
    </div>
  );
};

export default Password;
