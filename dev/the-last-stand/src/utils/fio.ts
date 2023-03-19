export const extractTextData = async (filepath: string): Promise<string> => {
    const response = await fetch(filepath);
    const data = await response.text();
    return data;
  };
  