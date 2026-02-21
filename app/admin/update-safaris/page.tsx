"use client";

import UpdateSafariForm from "@/app/components/UpdateSafariForm";
import { notFound } from "next/navigation";

export default function UpdatePage(){
    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Update Safari</h1>
            <UpdateSafariForm />
        </main>
    );
}