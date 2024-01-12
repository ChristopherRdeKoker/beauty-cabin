type GenerateNameAbbrImageProp = {
  name: string;
};

export function GenerateNameAbbrImage({ name }: GenerateNameAbbrImageProp) {
  const nameArray = name.split(' ');
  const firstName = nameArray[0]?.toUpperCase() ?? '';
  const lastName = nameArray[nameArray.length - 1]?.toUpperCase() ?? '';
  return (
    <div className="mr-4 flex h-[36px] w-[36px] items-center justify-center rounded-full border-[0.02rem] border-slate-400 bg-pink-200 text-red-800">
      <p>{`${firstName[0]}${lastName[0]}`}</p>
    </div>
  );
}
