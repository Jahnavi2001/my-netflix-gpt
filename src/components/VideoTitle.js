const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-10 md:pt-80 px-16 flex flex-col gap-8 absolute text-white bg-opacity-100 w-screen aspect-video bg-gradient-to-r from-black">
      <div className="text-xl md:text-3xl font-bold">{title}</div>
      <div className="hidden md:inline-block w-4/12 text-justify">{overview}</div>
      <div className="flex gap-4">
        <button className="rounded-md px-8 py-2 bg-white text-black hover:bg-slate-300">
          ▶️ Play
        </button>
        <button className="rounded-md px-8 py-2 bg-gray-50 text-white bg-opacity-10">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
