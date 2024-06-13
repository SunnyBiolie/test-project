import { uploadImage } from "@/action/upload-image";

const Following = () => {
  return (
    <div>
      <form action={uploadImage}>
        <input name="image" type="file" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Following;
