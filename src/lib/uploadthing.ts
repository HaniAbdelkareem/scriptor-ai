import { generateReactHelpers } from "@uploadthing/react"; // /hook
 
import type { OurFileRouter } from "@/app/api/uploadthing/core";
 
export const { useUploadThing } =
  generateReactHelpers<OurFileRouter>();