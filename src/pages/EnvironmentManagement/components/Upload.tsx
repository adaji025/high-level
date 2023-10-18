import { useState } from "react";
import { Text, Image, Box } from "@mantine/core";
import { Dropzone, FileWithPath, MS_EXCEL_MIME_TYPE  } from "@mantine/dropzone";

import ExcelIcon from "../../../assets/svgs/excel-icon.svg";

export function Upload() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        className="h-[100px] w-[100px] object-contain"
      />
    );
  });

  // console.log(previews);

  return (
    <div className="min-h-[150px] p-5 border shadow rounded-xl mb-10 flex flex-col justify-center text-xs">
      {previews.length === 0 ? (
        <Dropzone accept={MS_EXCEL_MIME_TYPE} onDrop={setFiles}>
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
        </Dropzone>
      ) : (
        <Box className="w-1/3 mx-auto">{previews}</Box>
      )}
    </div>
  );
}
