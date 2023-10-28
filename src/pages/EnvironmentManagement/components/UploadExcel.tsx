import { Modal, Text, LoadingOverlay, Button } from "@mantine/core";
import { useDropzone } from "react-dropzone";
import { GrStatusGood } from "react-icons/gr";
import ExcelIcon from "../../../assets/svgs/excel-icon.svg";
import { useState } from "react";
import { uploadExcel } from "../../../services/automation";
import { AutomationResponseTypes } from "../../../types/environments";

type Props = {
  opened: boolean;
  close: () => void;
  automationResponse: AutomationResponseTypes | null;
};

export const UploadExcel = ({ opened, close, automationResponse }: Props) => {
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const handleUploadExcel = () => {
    setLoading(true);
    const data = {
      file: acceptedFiles[0],
    };
    if (automationResponse)
      uploadExcel(automationResponse?.id, data)
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Modal
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        opened={opened}
        onClose={close}
        title="Authentication"
      >
        <div className="mt-10">
          <div
            {...getRootProps({
              className:
                "dropzone flex justify-center my-2 rounded-xl  cursor-pointer border gap-3 rounded-10 p-2 py-8 border-gradeEx-blue/20",
            })}
          >
            <input {...getInputProps()} />
            {acceptedFiles.length === 0 && (
              <div className="grid place-items-center">
                <div className="h-14 w-14 flex justify-center items-center bg-[#EAECF0] rounded-full">
                  <img src={ExcelIcon} alt="spread sheet" />
                </div>
                <div className="flex gap-2 mt-3">
                  <Text size="xs" fw={600} className="text-green-600 mb-1">
                    Click upload btn
                  </Text>
                  <Text size="xs">or drag and drop</Text>
                </div>
                <Text size="xs">Your Excel file here</Text>
              </div>
            )}
            {acceptedFiles.length !== 0 && (
              <div className="flex items-center gap-1">
                <GrStatusGood size="20" color="#00D8D8" />{" "}
                {acceptedFiles[0].name}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="bg-highLevelRed"
            onClick={handleUploadExcel}
          >
            Upload
          </Button>
        </div>
      </Modal>
    </>
  );
};
