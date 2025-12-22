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

const loginSchema = Yup.object({
  nama: Yup.string().required("Nama harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"></div>
      <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md border-white/10 bg-zinc-900/40 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Selamat Datang
            </span>
          </CardTitle>

          <CardDescription className="text-base text-zinc-400">
            Masuk ke akun kamu untuk melanjutkan
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* Nama Field */}
            <div className="space-y-2">
              <Label
                htmlFor="nama"
                className="text-sm font-medium text-zinc-300"
              >
                Nama
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama kamu"
                  value={values.nama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="border-white/10 bg-zinc-950/50 pl-10 text-white placeholder:text-zinc-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                />
                {touched.nama && errors.nama && (
                  <p className="text-sm text-red-400 mt-1">{errors.nama}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-300"
              >
                Password
              </Label>
              <div className="relative mb-5">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="border-white/10 bg-zinc-950/50 pl-10 pr-10 text-white placeholder:text-zinc-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-400 mt-1">{errors.password}</p>
                )}

                {/* Tombol Toggle Mata */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={formik.isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="group relative w-full overflow-hidden border-cyan-500/50 bg-gradient-to-r from-cyan-500 to-blue-500 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {formik.isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </span>
              {!formik.isSubmitting && (
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-zinc-900/40 px-2 text-zinc-500">atau</span>
              </div>
            </div>

            {/* Back to Home Link */}
            <Link
              href="/"
              className={`group flex w-full items-center justify-center space-x-2 text-sm text-zinc-400 transition-colors hover:text-cyan-400 ${formik.isSubmitting ? "pointer-events-none opacity-50" : ""
                }`}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Kembali ke Beranda</span>
            </Link>

            {/* Register Link */}
            <p className="text-center text-sm text-zinc-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className={`font-semibold text-cyan-400 transition-colors hover:text-cyan-300 ${formik.isSubmitting ? "pointer-events-none opacity-50" : ""
                  }`}
              >
                Daftar sekarang
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </div>
  );
}
