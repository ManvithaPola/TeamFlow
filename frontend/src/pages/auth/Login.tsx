// ============================================
// 📄 src/pages/auth/Login.tsx
// ============================================

import { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Layers,
  ShieldCheck,
  Zap,
  Home,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/auth";

// ==========================
// Validation Schema
// ==========================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    document.title = "Sign In · TeamFlow";
  }, []);

  // Already authenticated → skip login page
  if (!authLoading && isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setSubmitting(true);

    try {
      await login(data.email, data.password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message ??
          "Invalid email or password. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[#0B1120] font-['Inter']">
      {/* ================= LEFT — Brand / Visual Panel ================= */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0F172A] p-12 lg:flex">
        {/* Ambient gradient mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-[420px] w-[420px] animate-[drift-a_14s_ease-in-out_infinite] rounded-full bg-[#7C3AED]/30 blur-[110px]" />
          <div className="absolute bottom-0 right-0 h-[380px] w-[380px] animate-[drift-b_18s_ease-in-out_infinite] rounded-full bg-[#4C1D95]/30 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] shadow-[0_0_24px_rgba(124,58,237,0.5)]">
            <Layers size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-white">
            TeamFlow
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="font-['Space_Grotesk'] text-4xl font-semibold leading-tight text-white">
            Build, ship, and{" "}
            <span className="bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">
              collaborate
            </span>{" "}
            without the chaos.
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-slate-400">
            Kanban boards, RCA workflows, and real-time analytics — unified in a
            single control plane for your team.
          </p>

          <div className="mt-10 space-y-4">
            <FeatureRow
              icon={<ShieldCheck size={16} />}
              text="Enterprise-grade role-based access control"
            />
            <FeatureRow
              icon={<Zap size={16} />}
              text="Live analytics and instant workflow updates"
            />
            <FeatureRow
              icon={<Layers size={16} />}
              text="Unified boards, tasks, and root-cause tracking"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <p className="relative z-10 font-['IBM_Plex_Mono'] text-xs text-slate-600">
          © {new Date().getFullYear()} TeamFlow Inc. All systems operational.
        </p>
      </div>

      {/* ================= RIGHT — Form Panel ================= */}
      <div className="relative flex w-full flex-1 items-center justify-center bg-[#F8FAFC] p-6 lg:w-1/2">
        {/* subtle glow accents on light side */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#DDD6FE]/50 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-10 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="mb-8">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3 py-1 font-['IBM_Plex_Mono'] text-[11px] font-medium uppercase tracking-wide text-[#5B21B6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
              Secure Access
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl font-semibold text-[#111827]">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">
              Sign in to your TeamFlow workspace
            </p>
          </div>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{serverError}</p>
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#111827]"
              >
                Email address
              </label>
              <div
                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-all focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                  errors.email ? "border-red-300" : "border-gray-200"
                }`}
              >
                <Mail size={18} className="shrink-0 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#111827]"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-[#7C3AED] hover:text-[#5B21B6]"
                >
                  Forgot password?
                </button>
              </div>
              <div
                className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-all focus-within:border-[#7C3AED] focus-within:ring-4 focus-within:ring-[#7C3AED]/10 ${
                  errors.password ? "border-red-300" : "border-gray-200"
                }`}
              >
                <Lock size={18} className="shrink-0 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-gray-400"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
              />
              Remember this device
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.01 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </motion.button>

            <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-5 text-center">
              <h3 className="text-sm font-semibold text-gray-800">
                Need an account?
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                TeamFlow accounts are created by your organization's
                administrator. If you don't have access yet, contact your
                administrator to request an account.
              </p>

              <Link
                to="/contact-support"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-700 hover:shadow-lg"
              >
                Contact Administrator
              </Link>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-5">
              <Link
                to="/"
                className="group flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-all hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700"
              >
                <Home
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Home
              </Link>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Keyframes for ambient mesh drift */}
      <style>{`
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

const FeatureRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#A78BFA]">
      {icon}
    </div>
    <span className="text-sm text-slate-300">{text}</span>
  </div>
);

export default Login;
