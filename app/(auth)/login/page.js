"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, penpos } from "@/core/services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "@/core/feature/token/tokenSlice";
import { toast } from "sonner";
import { setUser } from "@/core/feature/user/userSlice";
import { setRole } from "@/core/feature/role/roleSlice";
import useSWR from "swr";

//GAMBAR
import Image from 'next/image';

//NAVBAR
import Navbar from "@/components/shared/Dashboard/navbar";


const loginSchema = Yup.object({
  nama: Yup.string().required("Nama harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

//GAMBAR
const backgroundPath = "/Asset/Background Landscape.png";
const welcomePath = "/Asset/LOGIN.png";
const logoPath = "/Asset/CEG HOMEPAGE.png";

export default function LoginPage() {

  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      nama: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const credentials = `${values.nama}:${values.password}`;
      const base64Credentials = typeof window !== 'undefined' ? btoa(credentials) : '';
      const data = { nama: values.nama, password: values.password };

      try {
        const response = await auth.login(data, base64Credentials);
        const access_token = response?.data?.data?.token;
        const username = response?.data?.data?.nama_tim;
        const role = response?.data?.data?.role;

        if (access_token) {
          dispatch(setToken({ token: access_token }));
          dispatch(setUser(username));
          dispatch(setRole(role));

          toast.success(`Selamat datang, ${username || 'User'}!`);

          const nextPath = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('from') : null;
          if (role === 'PESERTA') {
            router.push(nextPath || '/')
          } else if (role === 'ADMIN') {
            router.push('/admin')
          } else if (role === 'PENPOS') {

            router.push('/pos')
          }
        } else {
          toast.error("Login gagal: token tidak ditemukan");
        }
      } catch (error) {
        const msg = error?.response?.data?.message || error?.message || 'Login gagal, silahkan coba lagi';
        if (typeof window !== 'undefined') toast.error(msg);
      }
    },
  });

  const { handleSubmit, values, touched, errors } = formik;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* 1. Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src={backgroundPath} 
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* 2. Navbar */}
      <Navbar />

      {/* 3. Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-10 px-4">
        {/* Tulisan Welcome (LOGIN.png) */}
        <div className="mb-8">
          <Image 
            src={welcomePath} 
            alt="Welcome" 
            width={400} 
            height={150} 
            className="drop-shadow-lg"
          />
        </div>

        {/* Form Container (Transparan sesuai gambar) */}
        <div className="w-full max-w-4xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* USERNAME */}
            <div className="group">
              <label className="block text-teal-900 font-bold text-lg ml-2 mb-1">
                Username
              </label>
              <input
                type="text"
                name="nama"
                value={values.nama}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan username"
                className="w-full bg-white/40 border-none rounded-2xl py-4 px-6 
                          text-teal-900 placeholder:text-teal-800/60 
                          focus:ring-2 focus:ring-teal-500 
                          backdrop-blur-sm transition-all shadow-inner"
              />
              {touched.nama && errors.nama && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.nama}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="group">
              <label className="block text-teal-900 font-bold text-lg ml-2 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Masukkan password"
                  className="w-full bg-white/40 border-none rounded-2xl py-4 px-6 pr-12
                            text-teal-900 placeholder:text-teal-800/60 
                            focus:ring-2 focus:ring-teal-500 
                            backdrop-blur-sm transition-all shadow-inner"
                />

                {/* Toggle Eye */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-800"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>
              )}
            </div>


            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit"
                className="bg-teal-700/80 hover:bg-teal-800 text-white px-12 py-3 rounded-2xl font-bold text-xl shadow-lg backdrop-blur-md transition-all transform hover:scale-105"
              >
                Login
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
