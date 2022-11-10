const SliderCard = ({ name, idea, time }) => {
  return (
    <div className="l-[300px] w-[900px] rounded-lg shadow-lg bg-gray-900 bg-opacity-75">
      <div className="px-6 py-4">
        <div className="text-left text-xl mb-2 font-gorilla text-gray-50">
          Name:
        </div>
        <h1 className="text-left p-3 mt-2 text-gray-100 font-bold text-2xl tracking-tight">
          {name}
        </h1>
        <div className="text-xl mb-2 font-gorilla text-gray-50">Idea:</div>

        <p className="text-left  text-small overflow-ellipsis whitsespace-nowrap overflow-hidden flex  text-gray-100 ">
          {idea}
        </p>
        <div className="text-xl mb-2 font-gorilla text-gray-50">Time:</div>
        <h1 className="text-left p-3 mt-2 text-gray-100 font-bold text-2xl tracking-tight">
          {time}
        </h1>
      </div>
    </div>
  );
};

export default SliderCard;
