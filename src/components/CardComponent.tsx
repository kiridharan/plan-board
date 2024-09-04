export const CardComponent = ({
  icon,
  title,
  onClick,
}: {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-neutral-500 bg-neutral-500/20 text-neutral-500
      hover:bg-neutral-500/30 hover:text-neutral-500/90
       flex-col
      justify-center items-center flex cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <h2 className="text-center text-lg font-semibold">{title}</h2>
    </div>
  );
};
