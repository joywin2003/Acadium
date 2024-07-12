"use client";
import React, { useState } from "react";

export default function () {
  const [file, setFile] = useState<File | undefined>();

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const cloudinaryAPI = process.env.CLOUDINARY_API_KEY;
    console.log(file);

    if ( typeof file === 'undefined' ) return;

    const formData = new FormData();
    console.log(1, formData);
    formData.append('file', file);
    formData.append('upload_preset', 'q9e18w3l');
    formData.append('api_key', `${cloudinaryAPI}`);
    console.log(2, formData);

    const results = await fetch('https://api.cloudinary.com/v1_1/dxf13kwiz/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());
    console.log(results.url);
    
  }

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    
    setFile(target.files[0]);
  }
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
      <input type="file" name="image" accept="application/pdf/image" multiple onChange={handleOnChange} required></input>
    <button type="submit">Submit</button>

    </form>
    <a href={"https://res.cloudinary.com/dxf13kwiz/image/upload/v1720795068/dlny5filmdu4sk8nutcm.pdf"} download={"downloaded-file.pdf"}>
      Download PDF
    </a>
    </div>
  );
}
