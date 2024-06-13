export default function validQuantityImageFiles(
  currImages: File[] | undefined,
  newImages: File[] | undefined,
  currentIndex: number
): File[] | undefined {
  if (newImages) {
    if (!currImages) {
      if (newImages.length <= 8) {
        return newImages;
      } else {
        console.warn("Chỉ cho phép tối đa 8 hình ảnh. (1)");
        return newImages.slice(0, 8);
      }
    } else {
      // Đã có sẵn hình ảnh, hình ảnh mới được thêm từ input trong phần parameters

      if (currImages.length >= 8) {
        console.warn("Đã có đủ tối đa tám hình ảnh cho bài viết.");
        return currImages;
      } else if (currImages.length + newImages.length > 8) {
        console.warn("Chỉ cho phép tối đa 8 hình ảnh. (2)");
        const fitImages = newImages.slice(0, 8 - currImages.length);
        return [...currImages!, ...fitImages];
      } else {
        return [...currImages!, ...newImages];
      }
    }
  } else {
    if (currImages) {
      if (currImages.length === 1) return undefined;
      else return currImages.toSpliced(currentIndex, 1);
    }
  }
}
