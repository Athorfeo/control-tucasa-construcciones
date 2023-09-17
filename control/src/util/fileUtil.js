const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export async function getFile(id) {
    var data = null;

    try {
      const file = document.querySelector(id).files[0];
      const rawData = await fileToBase64(file);
      data = {
        mimeType: file.type,
        rawData: rawData,
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }