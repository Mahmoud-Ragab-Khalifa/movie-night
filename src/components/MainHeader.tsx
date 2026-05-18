const MainHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="relative py-2.5">
      <h2 className="font-semibold md:font-bold text-xl md:text-2xl">
        {title}
      </h2>

      <p className="font-bold text-xs md:text-sm mt-1 md:mt-1.5">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 w-1/2 md:w-1/4 h-1 rounded-full bg-linear-to-r from-primary via-primary/70 to-transparent shadow-2xl shadow-primary" />
    </div>
  );
};

export default MainHeader;
