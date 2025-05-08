"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { AlertSuccess } from "@/components/alert";
import { Camera } from "lucide-react";

export default function Settings() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("id");
    const [gender, setGender] = useState("male");
    const [address, setAddress] = useState("");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Data Disimpan:", { nama, email, selectedLanguage, gender, address, notificationsEnabled });
        handleAlert(<AlertSuccess title="Success">Berhasil Disimpan</AlertSuccess>);
    };

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);

    const handleAlert = (content: React.ReactNode) => {
        setAlertContent(content);
        setIsAlertOpen(true);
        setTimeout(() => setIsAlertOpen(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-lg w-full bg-slate-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-100 text-center">Pengaturan</h1>

                <form onSubmit={handleSubmit}>
                    {/* Foto Profil */}
                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="profile-upload" className="cursor-pointer relative w-24 h-24">
                            <img
                                src={profileImage || "/default-avatar.png"}
                                alt="Profile"
                                className="w-24 h-24 object-cover rounded-full border-4 border-slate-700"
                            />
                            <Camera className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full w-8 h-8 text-white" />
                        </label>
                        <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleProfileChange} />
                    </div>

                    {/* Nama */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-1">Nama:</label>
                        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-1">Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* Bahasa */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-1">Bahasa:</label>
                        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500">
                            <option value="id">Indonesia</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-1">Jenis Kelamin:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500">
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                    </div>

                    {/* Alamat */}
                    <div className="mb-4">
                        <label className="block text-gray-300 font-medium mb-1">Alamat:</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    {/* Notifikasi */}
                    <div className="mb-6 flex items-center">
                        <label className="w-48 font-medium text-gray-300">Aktifkan Notifikasi:</label>
                        <input type="checkbox" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)} className="rounded text-blue-500 focus:ring-blue-500 h-5 w-5" />
                    </div>

                    {/* Tombol Simpan */}
                    <button type="submit" className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all duration-300 py-3">Simpan Perubahan</button>
                </form>
            </div>

            {isAlertOpen && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">{alertContent}</div>
            )}
        </div>
    );
}
