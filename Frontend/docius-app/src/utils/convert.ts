export function base64ToFile(base64String: string, fileName: string, extension?: string) {
  const arr = base64String.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1] ?? "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const fullFileName = extension ? `${fileName}.${extension}` : fileName;

  return new File([u8arr], fullFileName, { type: mime });
}
