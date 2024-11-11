import React from "react";
import { MdOutlineWifi } from "react-icons/md";
import { FaCarOn, FaRadio } from "react-icons/fa6";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { IoMdTv } from "react-icons/io";

const Perks = ({ perks, setPerks }) => {
  const handleCbChange = (ev) => {
    const { checked, name } = ev.target;
    if (checked) {
      setPerks((prev) => {
        return [...prev, name];
      });
    } else {
      setPerks((prev) => {
        return [...prev.filter((sel) => sel !== name)];
      });
    }
  };
  return (
    <>
      <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
        <input
          type="checkbox"
          onChange={handleCbChange}
          checked={perks.includes("wifi")}
          name="wifi"
        />
        <span className="text-lg">
          <MdOutlineWifi />
        </span>
        <span className="md:text-sm text-xs">Wifi</span>
      </label>
      <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
        <input
          type="checkbox"
          onChange={handleCbChange}
          checked={perks.includes("parking")}
          name="parking"
        />
        <span className="text-lg">
          <FaCarOn />
        </span>
        <span className="md:text-sm text-xs">Parking</span>
      </label>
      <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
        <input
          type="checkbox"
          onChange={handleCbChange}
          checked={perks.includes("AC")}
          name="AC"
        />
        <span className="text-lg">
          <FaCloudShowersHeavy />
        </span>
        <span className="md:text-sm text-xs">AC</span>
      </label>
      <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
        <input
          type="checkbox"
          onChange={handleCbChange}
          checked={perks.includes("TV")}
          name="TV"
        />
        <span className="text-lg">
          <IoMdTv />
        </span>
        <span className="md:text-sm text-xs">TV</span>
      </label>
      <label className="border-2 cursor-pointer hover:shadow-lg transition-shadow duration-500 flex  rounded-lg gap-4 px-2 py-3 items-center ">
        <input
          type="checkbox"
          onChange={handleCbChange}
          checked={perks.includes("radio")}
          name="radio"
        />
        <span className="text-lg">
          <FaRadio />
        </span>
        <span className="md:text-sm text-xs">Radio</span>
      </label>
    </>
  );
};

export default Perks;
