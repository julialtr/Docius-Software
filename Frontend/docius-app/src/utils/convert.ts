export function base64ToFile(
  base64String: string,
  fileName: string,
  extension?: string
): File | null {
  try {
    const arr = base64String.split(",");
    if (arr.length !== 2) return null;

    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return null;

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    const fullFileName = extension ? `${fileName}.${extension}` : fileName;
    return new File([u8arr], fullFileName, { type: mime });
  } catch (e) {
    console.error("Erro ao converter base64 em File:", e);
    return null;
  }
}

export function toLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
