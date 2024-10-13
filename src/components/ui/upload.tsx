"use client";
import React, { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

export default function Upload() {
  const [imageData, setImageData] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    // You can handle form data submission here, such as sending the imageData to an API
    console.log("Submitted image data:", imageData);
    // Add any API submission logic here
  };

  return (
    <div className="h-fit w-full flex items-center justify-center bg-gray-50">
      <div className="w-full rounded-xl">
       
          <div className="grid grid-cols-1 space-y-2">
            <div className="flex items-center justify-between">
              {imageData && (
                <button
                  type="button"
                  onClick={() => setImageData("")}
                  className="py-1 px-3 focus:outline-none hover:bg-gray-200"
                >
                  + Edit Image
                </button>
              )}
            </div>

            {imageData ? (
              <div className="col-span-6 sm:col-span-4 shadow">
                <Image
                  src={imageData}
                  alt="Product Image"
                  width={1000}
                  height={250}
                  className="object-cover w-full h-[250px]"
                />
              </div>
            ) : (
              <UploadDropzone
              
               className=" text-zinc-600 ut-label:text-zinc-600 ut-button:bg-purple-500 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
               endpoint="imageUploader"
                onClientUploadComplete={(files: any) => {
                  const url = files?.[0]?.url;
                  if (url) {
                    setImageData(url);
                    window.alert("Upload completed");
                  }
                }}
                onUploadError={(error) => {
                  window.alert(`Upload failed: ${error.message}`);
                }}
              />
            )}
          </div>

        
    
      </div>
    </div>
  );
}
