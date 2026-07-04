// ============================================
// 📄 src/pages/auth/ContactSupport.tsx
// ============================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  Copy,
  Building2,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

const ContactSupport = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("admin@teamflow.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0B1120] p-6 font-['Inter']">
      {/* Ambient gradient mesh — matches Login page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] animate-[drift-a_14s_ease-in-out_infinite] rounded-full bg-[#7C3AED]/25 blur-[110px]" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] animate-[drift-b_18s_ease-in-out_infinite] rounded-full bg-[#4C1D95]/25 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/60 bg-white/80 p-10 shadow-[0_8px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl"
      >
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7C3AED] transition-colors hover:text-[#5B21B6]"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        <div className="mb-9 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] shadow-[0_0_32px_rgba(124,58,237,0.4)]"
          >
            <Building2 size={34} className="text-white" strokeWidth={2} />
          </motion.div>

          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FE] px-3 py-1 font-['IBM_Plex_Mono'] text-[11px] font-medium uppercase tracking-wide text-[#5B21B6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
            Access Request
          </span>

          <h1 className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold text-[#111827]">
            Contact Administrator
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Need access to TeamFlow? Reach out to your organization's
            administrator using the details below.
          </p>
        </div>

        <div className="space-y-4">
          <InfoRow
            icon={<Mail size={19} />}
            label="Email"
            value="admin@teamflow.com"
            delay={0.15}
          />
          <InfoRow
            icon={<Phone size={19} />}
            label="Phone"
            value="+91 98765 43210"
            delay={0.2}
          />
          <InfoRow
            icon={<Clock size={19} />}
            label="Office Hours"
            value={
              <>
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM
              </>
            }
            delay={0.25}
          />
        </div>

        <motion.button
          onClick={copyEmail}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy Email Address
            </>
          )}
        </motion.button>
      </motion.div>

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

const InfoRow = ({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#7C3AED]/30 hover:shadow-[0_4px_16px_rgba(124,58,237,0.08)]"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED] transition-colors group-hover:bg-[#7C3AED] group-hover:text-white">
      {icon}
    </div>
    <div>
      <h3 className="font-['Space_Grotesk'] text-sm font-semibold text-[#111827]">
        {label}
      </h3>
      <p className="mt-0.5 text-sm leading-5 text-gray-600">{value}</p>
    </div>
  </motion.div>
);

export default ContactSupport;