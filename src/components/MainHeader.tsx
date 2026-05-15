const MainHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="font-semibold md:font-bold text-xl md:text-2xl">
        {title}
      </h2>

      <p className="font-bold text-xs md:text-sm mt-1 md:mt-1.5">
        {description}
      </p>
    </div>
  );
};

export default MainHeader;
