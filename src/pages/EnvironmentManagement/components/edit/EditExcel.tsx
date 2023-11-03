import { GrStatusGood } from "react-icons/gr";
import { Text, Button } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import ExcelIcon from "../../../../assets/svgs/excel-icon.svg";
import { useDropzone } from "react-dropzone";
import { reUploadExcel } from "../../../../services/automation";
import useNotification from "../../../../hooks/useNotification";
import { AutomationDetailsTypes } from "../../../../types/automation";
import { toast } from "react-toastify";

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  autDetails: AutomationDetailsTypes | null;
};
const EditExcel = ({ setLoading, autDetails }: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "text/csv": [MIME_TYPES.xls, MIME_TYPES.xlsx] },
    onDropRejected: () => toast.error("Please choose an excel file")
  });

  const { handleError } = useNotification();

  const handleUploadExcel = () => {
    setLoading(true);
    const data = {
      file: acceptedFiles[0],
    };

    if (autDetails)
      reUploadExcel(autDetails?.id, data)
        .then(() => {
          toast.success("Excel uploaded successfully");
          close();
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };
  return (
    <div>
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
              <GrStatusGood size="20" color="#00D8D8" /> {acceptedFiles[0].name}
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
    </div>
  );
};

export default EditExcel;
