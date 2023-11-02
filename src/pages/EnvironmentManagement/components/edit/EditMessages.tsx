import { useEffect, useState } from "react";
import { Textarea, Button } from "@mantine/core";
import ReactQuill, { Quill } from "react-quill";
import { AutomationDetailsTypes } from "../../../../types/automation";
import { editMessage } from "../../../../services/automation";
import useNotification from "../../../../hooks/useNotification";
import { toast } from "react-toastify";

const modules = {
  toolbar: [
    ["undo", "redo"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: "justify" }, { align: "center" }, { align: "right" }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
  ],
};

type Props = {
  autDetails: AutomationDetailsTypes | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMessages = ({ autDetails, setLoading }: Props) => {
  const defaultEmail = autDetails?.messages[0];
  const defaultSms = autDetails?.messages[1];
  const [email, setEmail] = useState(
    localStorage.getItem("savedDefaultEmail") ?? ""
  );
  const [sms, setSms] = useState(defaultSms?.content);
  const { handleError } = useNotification();
  const icons = Quill.import("ui/icons");
  icons["undo"] = Undo;
  icons["redo"] = Redo;

  const handleUpdateMessage = (e: any) => {
    e.preventDefault();
    // setLoading(true);
    const data = [
      {
        id: defaultEmail?.id,
        content: email,
      },
      {
        id: defaultSms?.id,
        content: sms,
      },
    ];
    editMessage(data)
      .then(() => {
        toast.success("Messages updated successfully");
        localStorage.removeItem('savedDefaultEmail')
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (defaultEmail)
      localStorage.setItem("savedDefaultEmail", defaultEmail?.content);
  }, []);

  return (
    <div>
      <div className="mt-14">
        <Textarea
          autosize
          minRows={6}
          className="!text-base"
          label="SMS"
          placeholder="Type message"
          defaultValue={defaultSms?.content}
          onChange={(e) => setSms(e.target.value)}
        />
      </div>

      <div className="mt-14 mb-32 md:mb-24">
        <div className="mb-1 font-semibold">Email</div>
        <ReactQuill
          theme="snow"
          placeholder="Type email here ...."
          value={email}
          onChange={setEmail}
          modules={modules}
          className="h-[30vh] "
        />
      </div>
      <Button
        type="submit"
        size="md"
        className="bg-highLevelRed mt-10 mx-auto text-base"
        onClick={handleUpdateMessage}
      >
        Update Pipeline
      </Button>
    </div>
  );
};

export default EditMessages;

const Undo = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
</svg>`;

const Redo = `<svg viewbox="0 0 18 18">
<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
</svg>`;
