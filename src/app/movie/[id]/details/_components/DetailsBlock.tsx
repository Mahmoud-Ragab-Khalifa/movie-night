const DetailsBlock = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="my-4 flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{title}</span>
      <span className=" text-sm">{subTitle}</span>
    </div>
  );
};

export default DetailsBlock;
