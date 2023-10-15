import { useState } from "react";
import { Text, Image, Box, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import UploadIcon from "../../assets/svgs/upload-icon.svg";
import { AiOutlineCloudUpload } from "react-icons/ai";

export function Upload() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
            onLoad={() => URL.revokeObjectURL(imageUrl)}
            className="h-[200px] w-[200px] object-contain"
      />
    );
  });
    
    console.log(previews)

  return (
    <div className="min-h-[200px] p-10 upload-bg mb-10 flex flex-col justify-center">
      {previews.length === 0 ? (
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
          <div className="grid place-items-center">
            <img src={UploadIcon} alt="" />
            <div className="flex gap-2">
              <Text size="sm" fw={600}>
                Click upload btn
              </Text>
              <Text>or drag and drop</Text>
            </div>
            <Text>SVG, PNG, JPG or GIF (max. 800x400px)</Text>
            <Button
              mt={10}
              size="md"
              className="bg-[#00D8D8] rounded-lg font-medium text-white flex gap-2 items-center"
            >
              <AiOutlineCloudUpload size={20} color="white" />
              Upload
            </Button>
          </div>
        </Dropzone>
      ) : (
        <Box className="w-1/3 mx-auto">{previews}</Box>
      )}
    </div>
  );
}
