import Draw from "../../assets/svgs/draw.svg";
import { Text, Divider } from "@mantine/core";
import { useState } from "react";
import ReviewNDA from "../NDA/components/ReviewNDA";
import CreateNDA from "../NDA/components/CreateNDA";

const NDA = () => {
  const [openReview, setOpenReview] = useState(false);
  return (
    <div>
      <div className="relative text-[24px] mdtext-[32px] text-mainText font-extrabold lg:text-[36px]">
        Create <span className="font-black">your NDA</span>
        <img
          src={Draw}
          alt="draw"
          className="absolute left-16 -bottom-1 hidden xl:flex w-1/4"
        />
      </div>
      <Text mt={24}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitationLorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation
      </Text>

      <Divider my={60} />

      {!openReview && <CreateNDA setOpenReview={setOpenReview} />}
      {openReview && <ReviewNDA />}
    </div>
  );
};

export default NDA;
