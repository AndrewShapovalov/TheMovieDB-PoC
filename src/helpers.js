import { preloader } from "./preloader.js";

export const asyncProvider = async (func) => {
  try {
    preloader(true);
    if (typeof func === "function") {
      await func();
    }
  } catch (error) {
    console.log("Error in provider:", { error });
  } finally {
    preloader(false);
  }
};
