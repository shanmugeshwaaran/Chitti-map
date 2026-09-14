"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/superbase";
import Link from "next/link";
import { ArrowLeft, History, Mail, Phone, ShieldCheck, LogOut, Camera } from "lucide-react";

export default function UserProfilePage() {
  const [totalPoints, setTotalPoints] = useState(450);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userId = "STU-101";

  useEffect(() => {
    async function fetchPoints() {
      const { data, error } = await supabase
        .from("contributions")
        .select("points")
        .eq("user_id", userId);

      if (!error && data && data.length > 0) {
        const points = data.reduce((acc, curr) => acc + (curr.points || 0), 450);
        setTotalPoints(points);
      }
    }
    fetchPoints();

    const savedAvatar = localStorage.getItem("chitti_user_avatar");
    if (savedAvatar) setAvatarUrl(savedAvatar);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      localStorage.setItem("chitti_user_avatar", url);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6 flex flex-col items-center">
      {/* Top Navigation Links */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Map
        </Link>
        <Link href="/contributions" className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
          <History className="h-4 w-4" /> View Contribution History
        </Link>
      </div>

      {/* Main Profile Card Container */}
      <div className="w-full max-w-2xl bg-[#091124] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 relative">
        
        {/* Hidden file input for photo upload */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleAvatarChange}
        />

        {/* Header Section: Avatar & Name */}
        <div className="flex items-center gap-6 pb-6 border-b border-white/10">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-2xl bg-blue-600/20 border-2 border-blue-500/50 flex items-center justify-center overflow-hidden cursor-pointer relative group flex-shrink-0 shadow-lg"
            title="Click to change profile photo"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white mb-1" />
              <span className="text-[9px] font-bold text-white">Upload Photo</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Karthi Kumar</h1>
              <span className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-300">
                STU-101
              </span>
            </div>
            <p className="text-sm text-slate-400">Chitti STEM Batch 2026</p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-medium mt-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Elite Data Contributor
            </div>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-[11px] text-slate-400">Email ID</p>
              <p className="text-sm font-semibold text-slate-200">karthi.chitti@gmail.com</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-[11px] text-slate-400">Mobile Number</p>
              <p className="text-sm font-semibold text-slate-200">+91 98422 12345</p>
            </div>
          </div>
        </div>

        {/* Chitti Score & Global Rank Card */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Chitti Score (Verified Contributions)
            </p>
            <p className="text-3xl font-extrabold text-blue-400 mt-1">
              {totalPoints} <span className="text-sm font-normal text-slate-400">Points</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Global Rank</p>
            <p className="text-2xl font-bold text-white mt-0.5">
              #04 <span className="text-xs text-emerald-400 font-semibold">Tamil Nadu</span>
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <span>Secured via Supabase & Chitti Network</span>
          <button className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <LogOut className="h-3.5 w-3.5" /> Logout Account
          </button>
        </div>

      </div>
    </div>
  );
}