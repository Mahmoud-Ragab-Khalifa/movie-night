import { CameraIcon } from "lucide-react";

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<string>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setSelectedImage(url);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />

      <label
        htmlFor="image-upload"
        className="border border-border rounded-full w-50 h-50 flex items-center justify-center cursor-pointer"
      >
        <CameraIcon className="w-8! h-8! text-muted-foreground" />
      </label>
    </>
  );
};

export default UploadImage;
