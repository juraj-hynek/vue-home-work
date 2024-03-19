export function tryCatchWrapper(callback) {
  return async function (...args) {
    try {
      const result = await callback(...args);
      console.log("result", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };
}
