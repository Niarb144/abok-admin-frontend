"use client";

import { useState } from "react";

export default function UploadGallery() {

    const [files,setFiles] = useState<File[]>([]);
    const [preview,setPreview] = useState<string[]>([]);
    const [loading,setLoading] = useState(false);

    const handleFiles = (e:any) => {

    const selected = Array.from(e.target.files) as File[];

    setFiles((prev)=>[...prev, ...selected]);

    const previews = selected.map((file:any)=>URL.createObjectURL(file));

    setPreview((prev)=>[...prev,...previews]);

    };

    const removeFile = (index:number) => {

    const newFiles = [...files];
    const newPreview = [...preview];

    newFiles.splice(index,1);
    newPreview.splice(index,1);

    setFiles(newFiles);
    setPreview(newPreview);

    };

    const handleUpload = async (e:any) => {

        e.preventDefault();

        if(files.length === 0) return;

        setLoading(true);

        const formData = new FormData();

        files.forEach(file=>{
        formData.append("media",file);
        });

    try{

        await fetch(
        "https://abok-adventures-backend.onrender.com/api/gallery/upload",
        {
        method:"POST",
        body:formData
        }
        );
        alert("Media uploaded successfully");

        setFiles([]);
        setPreview([]);

    }
    catch(err){
    console.error(err);
    }

    setLoading(false);

    };

    return (

    <div className="max-w-5xl mx-auto py-16 px-6">

    <h1 className="text-2xl font-semibold mb-6">
    Upload Gallery Media
    </h1>

    <form onSubmit={handleUpload} className="space-y-6">

    {/* Upload Area */}

    <label className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#8B4513] transition">

    <p className="text-gray-600">
    Click to Upload
    </p>

    <p className="text-sm text-gray-400 mt-1">
    Images or Videos
    </p>

    <input
    type="file"
    multiple
    accept="image/*,video/*"
    onChange={handleFiles}
    className="hidden"
    />

    </label>

    {/* Preview Grid */}

    {preview.length > 0 && (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {preview.map((src,index)=>{

    const file = files[index];

    const isVideo = file.type.startsWith("video");

    return(

    <div
    key={index}
    className="relative group rounded-lg overflow-hidden border"
    >

    {isVideo ? (

    <video
    src={src}
    className="w-full h-40 object-cover"
    controls
    />

    ):(

    <img
    src={src}
    className="w-full h-40 object-cover"
    />

    )}

    <button
    type="button"
    onClick={()=>removeFile(index)}
    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
    >

    Remove

    </button>

    </div>

    );

    })}

    </div>

    )}

    {/* Upload Button */}

    <button
    type="submit"
    disabled={loading}
    className="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#8B4513]/90 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
    >

    {loading ? "Uploading..." : "Upload Media"}

    </button>

    </form>

    </div>

    );

}