import React from "react";

const View = ({ id }: { id: string | number }) => {
  return (
    <div className="fixed bottom-4 right-4  pt-2 flex justify-center items-center text-xl px-6 rounded-md bg-pink-300 shadow-lg">
      Views {id}
    </div>
  );
};

export default View;
