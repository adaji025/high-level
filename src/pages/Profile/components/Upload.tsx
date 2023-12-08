import { useState } from "react";
import { Text, Image, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import {SlCloudUpload} from "react-icons/sl"

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


  return (
    <div className="min-h-[150px] p-5 border shadow rounded-xl mb-10 flex flex-col justify-center text-xs">
      {previews.length === 0 ? (
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
          <div className="grid place-items-center">
            <div className="h-14 w-14 flex justify-center items-center bg-[#EAECF0] rounded-full">
              <SlCloudUpload size="30" />
            </div>
            <div className="flex gap-2 mt-3">
              <Text size="xs" fw={600}>
                Click upload btn
              </Text>
              <Text size="xs">or drag and drop</Text>
            </div>
            <Text size="xs">SVG, PNG, JPG or GIF (max. 800x400px)</Text>
          </div>
        </Dropzone>
      ) : (
        <Box className="w-1/3 mx-auto">{previews}</Box>
      )}
    </div>
  );
}
