const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`"relative flex items-center justify-center w-full ${className}`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
