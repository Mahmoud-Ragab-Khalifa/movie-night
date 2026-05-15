const MainHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="font-bold text-2xl md:text-3xl">{title}</h2>

      <p className="font-bold text-sm md:text-base mt-2">{description}</p>
    </div>
  );
};

export default MainHeader;
