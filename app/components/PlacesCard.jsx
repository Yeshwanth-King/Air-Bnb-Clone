import React from "react";

const PlacesCard = () => {
  return (
    <div className="flex border-2 border-white p-4 text-white bg-gray-800 w-full max-w-lg">
      <div className="flex-1 border-2 border-white flex items-center justify-center p-4 mr-4">
        Image
      </div>
      <div className="flex-2 flex flex-col gap-4">
        <div className="border-2 border-white p-2 text-center">Title</div>
        <div className="border-2 border-white p-2 flex-1">Descriptions</div>
        <div className="flex flex-col gap-4">
          <button className="border-2 border-white p-2 bg-transparent text-white">
            Review
          </button>
          <button className="border-2 border-white p-2 bg-transparent text-white">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacesCard;
