import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, FileText, Wrench, CheckCircle, Loader2, ShieldCheck, ImagePlus, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EQUIPMENT_OPTIONS: Record<string, string[]> = {
  "AMFDC MK-II": ["AMFDC MK-II (a)", "AMFDC MK-II (b)", "AMFDC MK-II (c)", "AMFDC MK-II (d)"],
  "AMFDC MK-III": ["AMFDC MK-III (a)", "AMFDC MK-III (b)", "AMFDC MK-III (c)", "AMFDC MK-III (d)"],
  "TEEVRA FDC": ["TEEVRA FDC (a)", "TEEVRA FDC (b)", "TEEVRA FDC (c)", "TEEVRA FDC (d)"],
  "GBInP-17 Universal": ["GBInP-17 Universal (a)", "GBInP-17 Universal (b)", "GBInP-17 Universal (c)", "GBInP-17 Universal (d)"],
  "LCGB-HMRSV-21-XG": ["LCGB-HMRSV-21-XG (a)", "LCGB-HMRSV-21-XG (b)", "LCGB-HMRSV-21-XG (c)", "LCGB-HMRSV-21-XG (d)"],
  "FSD Flexible / INVSS": ["FSD Flexible / INVSS (a)", "FSD Flexible / INVSS (b)", "FSD Flexible / INVSS (c)", "FSD Flexible / INVSS (d)"],
  "ATGM SV21 Simulator": ["ATGM SV21 Simulator (a)", "ATGM SV21 Simulator (b)", "ATGM SV21 Simulator (c)", "ATGM SV21 Simulator (d)"],
};

const PRODUCT_OPTIONS = [
  { value: "fire-control", label: "Fire Control Systems (AMFDC)" },
  { value: "inspection", label: "Gun Barrel Inspection (GBInP)" },
  { value: "surveillance", label: "Field Surveillance (FSD/INVSS)" },
  { value: "simulators", label: "Simulators & Training" },
  { value: "industrial", label: "Industrial Automation" },
  { value: "services", label: "Repair & AMC Services" },
  { value: "other", label: "Other" },
];

const validatePhone = (phone: string) => /^\d{10}$/.test(phone.replace(/\s+/g, ""));
const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const EnquiryPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("type") === "repair" ? "repair" : "enquiry";
  const [activeTab, setActiveTab] = useState<"enquiry" | "repair">(initialTab);
  const { toast } = useToast();

  // OTP state
  const [otpStep, setOtpStep] = useState<"form" | "otp" | "verified">("form");
  const [otpCode, setOtpCode] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: "", email: "", phone: "", organization: "",
    subject: "", product_interest: "", message: "",
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Repair form state
  const [repairForm, setRepairForm] = useState({
    name: "", email: "", phone: "", organization: "",
    equipment_category: "", equipment_variant: "", serial_number: "", issue_description: "",
  });
  const [repairImages, setRepairImages] = useState<File[]>([]);
  const [repairImagePreviews, setRepairImagePreviews] = useState<string[]>([]);
  const [repairSubmitting, setRepairSubmitting] = useState(false);
  const [repairSubmitted, setRepairSubmitted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentEmail = activeTab === "enquiry" ? enquiryForm.email : repairForm.email;

  const clearError = (field: string) => setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const validateEnquiryForm = () => {
    const e: Record<string, string> = {};
    if (!enquiryForm.name.trim()) e.eq_name = "Name is required";
    if (!validateEmail(enquiryForm.email)) e.eq_email = "Enter a valid email (e.g. you@company.com)";
    if (!validatePhone(enquiryForm.phone)) e.eq_phone = "Enter a valid 10-digit phone number";
    if (!enquiryForm.subject.trim()) e.eq_subject = "Subject is required";
    if (!enquiryForm.message.trim()) e.eq_message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRepairForm = () => {
    const e: Record<string, string> = {};
    if (!repairForm.name.trim()) e.rp_name = "Name is required";
    if (!validateEmail(repairForm.email)) e.rp_email = "Enter a valid email (e.g. you@company.com)";
    if (!validatePhone(repairForm.phone)) e.rp_phone = "Enter a valid 10-digit phone number";
    if (!repairForm.equipment_category) e.rp_equipment = "Select equipment";
    if (!repairForm.issue_description.trim()) e.rp_issue = "Describe the issue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmail(currentEmail)) {
      toast({ title: "Invalid Email", description: "Enter a valid email address (e.g. you@company.com).", variant: "destructive" });
      return;
    }
    setOtpSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-otp", {
        body: { email: currentEmail, form_type: activeTab },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOtpStep("otp");
      toast({ title: "OTP Sent!", description: `A verification code has been sent to ${currentEmail}` });
    } catch (err: any) {
      toast({ title: "Failed to send OTP", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit code.", variant: "destructive" });
      return;
    }
    setOtpVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        body: { email: currentEmail, otp_code: otpCode },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOtpStep("verified");
      setVerifiedEmail(currentEmail);
      toast({ title: "Email Verified!", description: "Your email has been verified successfully." });
    } catch (err: any) {
      toast({ title: "Verification Failed", description: err.message || "Invalid or expired OTP.", variant: "destructive" });
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEnquiryForm()) return;
    if (verifiedEmail !== enquiryForm.email) {
      toast({ title: "Email Not Verified", description: "Please verify your email before submitting.", variant: "destructive" });
      return;
    }
    setEnquirySubmitting(true);
    try {
      const response = await fetch("https://hook.eu1.make.com/pt86lujdh37kn5u882s4xf5vimr5wx3n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiryForm, form_type: "enquiry", submitted_at: new Date().toISOString() }),
      });
      if (response.ok) {
        setEnquirySubmitted(true);
        toast({ title: "Enquiry Submitted", description: "We'll get back to you within 24 hours." });
      } else throw new Error("Failed");
    } catch {
      toast({ title: "Submission Failed", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setEnquirySubmitting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(f => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      toast({ title: "Some files skipped", description: "Only images under 5MB are allowed.", variant: "destructive" });
    }
    const newFiles = [...repairImages, ...validFiles].slice(0, 5);
    setRepairImages(newFiles);
    setRepairImagePreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(repairImagePreviews[index]);
    setRepairImages(prev => prev.filter((_, i) => i !== index));
    setRepairImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleRepairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRepairForm()) return;
    if (verifiedEmail !== repairForm.email) {
      toast({ title: "Email Not Verified", description: "Please verify your email before submitting.", variant: "destructive" });
      return;
    }
    setRepairSubmitting(true);
    try {
      // Upload images first
      const uploadedUrls: string[] = [];
      for (const file of repairImages) {
        const fileName = `repair_${Date.now()}_${crypto.randomUUID()}.${file.name.split('.').pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("repair-images")
          .upload(fileName, file, { contentType: file.type });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("repair-images").getPublicUrl(fileName);
        uploadedUrls.push(publicUrlData.publicUrl);
      }

      // Insert into database
      const { error } = await supabase.from("repair_submissions" as any).insert({
        name: repairForm.name,
        email: repairForm.email,
        phone: repairForm.phone,
        organization: repairForm.organization,
        equipment_category: repairForm.equipment_category,
        equipment_variant: repairForm.equipment_variant,
        serial_number: repairForm.serial_number,
        issue_description: repairForm.issue_description,
        image_urls: uploadedUrls,
      });
      if (error) throw error;

      setRepairSubmitted(true);
      toast({ title: "Repair Request Submitted", description: "Our service team will contact you shortly." });
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message || "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setRepairSubmitting(false);
    }
  };

  const resetOtp = () => {
    if (otpStep !== "form") {
      setOtpStep("form");
      setOtpCode("");
      setVerifiedEmail("");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-card border border-gunmetal/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brass-gold/60 focus:ring-1 focus:ring-brass-gold/30 transition-colors text-base";
  const labelClass = "block text-base font-medium text-foreground mb-1.5";
  const errorClass = "text-red-500 text-sm mt-1";

  const renderEmailFieldWithOtp = (formEmail: string, setFormEmail: (email: string) => void, errorKey: string) => (
    <div>
      <label className={labelClass}>Email Address *</label>
      <div className="flex gap-2">
        <input
          type="email"
          required
          className={`${inputClass} flex-1 ${errors[errorKey] ? "border-red-500" : ""}`}
          placeholder="you@company.com"
          value={formEmail}
          onChange={(e) => {
            setFormEmail(e.target.value);
            clearError(errorKey);
            if (verifiedEmail && e.target.value !== verifiedEmail) resetOtp();
          }}
          disabled={otpStep === "verified"}
        />
        {otpStep === "form" && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSending || !validateEmail(formEmail)}
            className="btn-primary px-4 py-3 text-base whitespace-nowrap flex items-center gap-2"
          >
            {otpSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Verify
          </button>
        )}
        {otpStep === "verified" && (
          <div className="flex items-center gap-1 px-3 bg-defence-green/10 border border-defence-green/30 text-defence-green text-base font-medium">
            <ShieldCheck className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>
      {errors[errorKey] && <p className={errorClass}>{errors[errorKey]}</p>}
      {otpStep === "otp" && (
        <div className="mt-3 p-4 bg-card border border-brass-gold/30">
          <p className="text-base text-muted-foreground mb-2">Enter the 6-digit code sent to <strong>{formEmail}</strong></p>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              className={`${inputClass} flex-1 text-center text-lg tracking-[0.5em] font-mono`}
              placeholder="000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpVerifying || otpCode.length !== 6}
              className="btn-accent px-4 py-3 text-base flex items-center gap-2"
            >
              {otpVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Confirm
            </button>
          </div>
          <button type="button" onClick={handleSendOtp} disabled={otpSending} className="text-sm text-brass-gold mt-2 hover:underline">
            Resend code
          </button>
        </div>
      )}
    </div>
  );

  const renderPhoneField = (value: string, onChange: (v: string) => void, errorKey: string) => (
    <div>
      <label className={labelClass}>Phone Number * <span className="text-muted-foreground font-normal text-sm">(10 digits)</span></label>
      <input
        type="tel"
        required
        className={`${inputClass} ${errors[errorKey] ? "border-red-500" : ""}`}
        placeholder="9876543210"
        maxLength={10}
        value={value}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "").slice(0, 10);
          onChange(v);
          clearError(errorKey);
        }}
      />
      {errors[errorKey] && <p className={errorClass}>{errors[errorKey]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-sand-dark/50">
          <div className="container-width px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="section-divider" />
                  <span className="text-brass-gold font-semibold text-sm uppercase tracking-widest">Get a Quote</span>
                  <span className="section-divider" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 mb-6">
                  How Can We Help?
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Submit an enquiry for new products or request repair & maintenance support for existing equipment.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tab Selector */}
        <section className="section-padding bg-background">
          <div className="container-width max-w-3xl">
            <ScrollReveal>
              <div className="flex border border-gunmetal/20 mb-10">
                <button
                  onClick={() => { setActiveTab("enquiry"); resetOtp(); setErrors({}); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-base uppercase tracking-wider transition-colors ${
                    activeTab === "enquiry" ? "bg-defence-green text-white" : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="w-4 h-4" /> New Enquiry
                </button>
                <button
                  onClick={() => { setActiveTab("repair"); resetOtp(); setErrors({}); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-base uppercase tracking-wider transition-colors ${
                    activeTab === "repair" ? "bg-defence-green text-white" : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Wrench className="w-4 h-4" /> Repair Request
                </button>
              </div>
            </ScrollReveal>

            {/* Enquiry Form */}
            {activeTab === "enquiry" && (
              <ScrollReveal>
                {enquirySubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 bg-defence-green/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-defence-green" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">Enquiry Received!</h3>
                    <p className="text-muted-foreground mb-6">Our team will review your requirements and respond within 24 hours.</p>
                    <Link to="/" className="btn-primary inline-flex items-center gap-2">Back to Home</Link>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" required className={`${inputClass} ${errors.eq_name ? "border-red-500" : ""}`} placeholder="Your full name"
                          value={enquiryForm.name} onChange={(e) => { setEnquiryForm({ ...enquiryForm, name: e.target.value }); clearError("eq_name"); }} />
                        {errors.eq_name && <p className={errorClass}>{errors.eq_name}</p>}
                      </div>
                      {renderEmailFieldWithOtp(enquiryForm.email, (email) => setEnquiryForm({ ...enquiryForm, email }), "eq_email")}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {renderPhoneField(enquiryForm.phone, (phone) => setEnquiryForm({ ...enquiryForm, phone }), "eq_phone")}
                      <div>
                        <label className={labelClass}>Organization</label>
                        <input type="text" className={inputClass} placeholder="Company / Unit name"
                          value={enquiryForm.organization} onChange={(e) => setEnquiryForm({ ...enquiryForm, organization: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Product / Service Interest</label>
                      <select className={inputClass}
                        value={enquiryForm.product_interest} onChange={(e) => setEnquiryForm({ ...enquiryForm, product_interest: e.target.value })}>
                        <option value="">Select area of interest</option>
                        {PRODUCT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input type="text" required className={`${inputClass} ${errors.eq_subject ? "border-red-500" : ""}`} placeholder="Brief subject of your enquiry"
                        value={enquiryForm.subject} onChange={(e) => { setEnquiryForm({ ...enquiryForm, subject: e.target.value }); clearError("eq_subject"); }} />
                      {errors.eq_subject && <p className={errorClass}>{errors.eq_subject}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Detailed Requirements *</label>
                      <textarea required rows={5} className={`${inputClass} ${errors.eq_message ? "border-red-500" : ""}`} placeholder="Describe your requirements..."
                        value={enquiryForm.message} onChange={(e) => { setEnquiryForm({ ...enquiryForm, message: e.target.value }); clearError("eq_message"); }} />
                      {errors.eq_message && <p className={errorClass}>{errors.eq_message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={enquirySubmitting || otpStep !== "verified"}
                      className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {enquirySubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      {enquirySubmitting ? "Submitting..." : otpStep !== "verified" ? "Verify Email to Submit" : "Submit Enquiry"}
                    </button>
                  </form>
                )}
              </ScrollReveal>
            )}

            {/* Repair Form */}
            {activeTab === "repair" && (
              <ScrollReveal>
                {repairSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 bg-defence-green/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-defence-green" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">Repair Request Received!</h3>
                    <p className="text-muted-foreground mb-6">Our service team will contact you to schedule inspection and repair.</p>
                    <Link to="/" className="btn-primary inline-flex items-center gap-2">Back to Home</Link>
                  </div>
                ) : (
                  <form onSubmit={handleRepairSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" required className={`${inputClass} ${errors.rp_name ? "border-red-500" : ""}`} placeholder="Your full name"
                          value={repairForm.name} onChange={(e) => { setRepairForm({ ...repairForm, name: e.target.value }); clearError("rp_name"); }} />
                        {errors.rp_name && <p className={errorClass}>{errors.rp_name}</p>}
                      </div>
                      {renderEmailFieldWithOtp(repairForm.email, (email) => setRepairForm({ ...repairForm, email }), "rp_email")}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {renderPhoneField(repairForm.phone, (phone) => setRepairForm({ ...repairForm, phone }), "rp_phone")}
                      <div>
                        <label className={labelClass}>Organization / Unit</label>
                        <input type="text" className={inputClass} placeholder="Company / Unit name"
                          value={repairForm.organization} onChange={(e) => setRepairForm({ ...repairForm, organization: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Equipment Name *</label>
                        <select
                          required
                          className={`${inputClass} ${errors.rp_equipment ? "border-red-500" : ""}`}
                          value={repairForm.equipment_category}
                          onChange={(e) => {
                            setRepairForm({ ...repairForm, equipment_category: e.target.value, equipment_variant: "" });
                            clearError("rp_equipment");
                          }}
                        >
                          <option value="">Select equipment</option>
                          {Object.keys(EQUIPMENT_OPTIONS).map((eq) => (
                            <option key={eq} value={eq}>{eq}</option>
                          ))}
                        </select>
                        {errors.rp_equipment && <p className={errorClass}>{errors.rp_equipment}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Equipment Variant</label>
                        <select
                          className={inputClass}
                          value={repairForm.equipment_variant}
                          onChange={(e) => setRepairForm({ ...repairForm, equipment_variant: e.target.value })}
                          disabled={!repairForm.equipment_category}
                        >
                          <option value="">Select variant</option>
                          {repairForm.equipment_category && EQUIPMENT_OPTIONS[repairForm.equipment_category]?.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                     <div>
                       <label className={labelClass}>Serial Number</label>
                       <input type="text" className={inputClass} placeholder="Equipment serial number"
                         value={repairForm.serial_number} onChange={(e) => setRepairForm({ ...repairForm, serial_number: e.target.value })} />
                     </div>
                    </div>
                    <div>
                      <label className={labelClass}>Issue Description *</label>
                      <textarea required rows={5} className={`${inputClass} ${errors.rp_issue ? "border-red-500" : ""}`} placeholder="Describe the issue, symptoms, error codes..."
                        value={repairForm.issue_description} onChange={(e) => { setRepairForm({ ...repairForm, issue_description: e.target.value }); clearError("rp_issue"); }} />
                      {errors.rp_issue && <p className={errorClass}>{errors.rp_issue}</p>}
                    </div>
                    {/* Image Upload */}
                    <div>
                      <label className={labelClass}>Damage Images <span className="text-muted-foreground font-normal text-sm">(up to 5, max 5MB each)</span></label>
                      <div className="flex flex-wrap gap-3 mb-2">
                        {repairImagePreviews.map((src, i) => (
                          <div key={i} className="relative w-20 h-20 border border-gunmetal/20 overflow-hidden group">
                            <img src={src} alt={`Damage ${i + 1}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(i)}
                              className="absolute top-0 right-0 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {repairImages.length < 5 && (
                          <label className="w-20 h-20 border-2 border-dashed border-gunmetal/30 flex flex-col items-center justify-center cursor-pointer hover:border-brass-gold/60 transition-colors">
                            <ImagePlus className="w-5 h-5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground mt-1">Add</span>
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />
                          </label>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={repairSubmitting || otpStep !== "verified"}
                      className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {repairSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wrench className="w-5 h-5" />}
                      {repairSubmitting ? "Submitting..." : otpStep !== "verified" ? "Verify Email to Submit" : "Submit Repair Request"}
                    </button>
                  </form>
                )}
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EnquiryPage;
