"use client";

import { useState } from "react";

export default function UploadGallery() {

const [file, setFile] = useState<File | null>(null);

const handleUpload = async (e:any) => {

e.preventDefault();

if (!file) return;

const formData = new FormData();
formData.append("media", file);

await fetch("https://yourapi.com/api/gallery/upload", {
method:"POST",
body:formData
});

};

return (

<form onSubmit={handleUpload}>

<input
type="file"
accept="image/*,video/mp4"
onChange={(e:any)=>setFile(e.target.files[0])}
/>

<button type="submit">
Upload
</button>

</form>

);

}