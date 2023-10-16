import NDAImage from "../../../assets/svgs/nda.svg";
import { useDisclosure } from "@mantine/hooks";
import Confirmation from "./Confirmation";
import { Button } from "@mantine/core";

const ReviewNDA = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Confirmation close={close} opened={opened} />
      <div className="shadow-2xl border rounded-[15px] border-[#00D8D8] pt-[78px] px-[72px] mb-10">
        <div className="flex justify-between">
          <img src={NDAImage} alt="non disclosure agreement" />
          <div className="text-2xl font-medium text-gray-400">27.09.23</div>
        </div>

        <div className="grid gap-3 my-10">
          <div className="font-bold">
            This Non-Disclosure Agreement ("Agreement") is made and entered into
            on this ____ day of ____________, 20, ("Effective Date"), by and
            between:
          </div>
          <div>
            [Your Name or Company Name], with its principal office located at
            [Your Address], hereinafter referred to as the "Disclosing Party,"
            and [Recipient's Name or Company Name], with its principal office
            located at [Recipient's Address], hereinafter referred to as the
            "Receiving Party."
          </div>
          <div>
            WHEREAS, the Disclosing Party possesses certain confidential and
            proprietary information ("Confidential Information") that it desires
            to disclose to the Receiving Party for the purpose of [Specify the
            purpose of disclosing the information, e.g., "evaluating a potential
            business collaboration" or "discussing a potential investment
            opportunity"];
          </div>
          <div>
            NOW, THEREFORE, in consideration of the premises and covenants
            contained herein, the parties agree as follows:
          </div>
          <div>1. DEFINITIONS</div>
          <div>
            1.1 "Confidential Information" shall mean any information, data, or
            materials, in whatever form, whether oral, written, or electronic,
            that is disclosed by the Disclosing Party to the Receiving Party and
            is marked as "Confidential" or is reasonably understood to be
            confidential given the nature of the information and the
            circumstances of disclosure. Confidential Information may include,
            but is not limited to, trade secrets, business plans, financial
            information, product designs, customer lists, marketing strategies,
            and any other information that is not publicly available.
          </div>
          <div>
            1.2 "Recipient" refers to the Receiving Party, including its
            employees, agents, and representatives, who have a need to know and
            access the Confidential Information for the purposes outlined in
            this Agreement.
          </div>
          <div>2. CONFIDENTIALITY OBLIGATIONS</div>
          <div>
            2.1 The Receiving Party agrees to keep all Confidential Information
            received from the Disclosing Party confidential and to use it only
            for the purpose stated in this Agreement. The Receiving Party shall
            not use the Confidential Information for its own benefit or disclose
            it to any third party without the prior written consent of the
            Disclosing Party.
          </div>
          <div>
            2.2 The Receiving Party shall take reasonable steps to protect the
            confidentiality of the Confidential Information, including but not
            limited to implementing appropriate security measures and
            restricting access to those of its employees, agents, and
            representatives who have a need to know such information.
          </div>
          <div>
            2.3 The Receiving Party's obligations under this Agreement shall
            continue for a period of [Specify the duration of confidentiality,
            e.g., "three (3) years"] from the Effective Date, or until such time
            as the Confidential Information becomes publicly available through
            no fault of the Receiving Party.
          </div>
          <div>3. RETURN OF CONFIDENTIAL INFORMATION</div>
          <div>
            **Upon the written request of the Disclosing Party, or upon
            termination of this Agreement, the Receiving Party shall promptly
            return or destroy all Confidential Information and any copies,
            notes, or summaries thereof, in whatever form, and shall certify in
            writing to the Disclosing
          </div>
        </div>
      </div>
      <div className="mt-20 flex gap-3 font-semibold text-black hover:text-black/70 justify-end pb-10">
        <button className="">Back</button>
        <Button
        size="md"
          className="bg-[#00D8D8] rounded-lg font-semibold text-white"
          onClick={open}
        >
          Send for signing
        </Button>
      </div>
    </div>
  );
};

export default ReviewNDA;
