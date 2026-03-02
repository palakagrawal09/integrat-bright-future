import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, FileText, Wrench, CheckCircle, Loader2, ShieldCheck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    equipment_name: "", serial_number: "", issue_description: "", urgency: "normal",
  });
  const [repairSubmitting, setRepairSubmitting] = useState(false);
  const [repairSubmitted, setRepairSubmitted] = useState(false);

  const currentEmail = activeTab === "enquiry" ? enquiryForm.email : repairForm.email;

  const handleSendOtp = async () => {
    if (!currentEmail || !currentEmail.includes("@")) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address first.", variant: "destructive" });
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

  const handleRepairSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifiedEmail !== repairForm.email) {
      toast({ title: "Email Not Verified", description: "Please verify your email before submitting.", variant: "destructive" });
      return;
    }
    setRepairSubmitting(true);
    try {
      const response = await fetch("https://hook.eu1.make.com/rmoutpfypcl6hz1l6fh1sa8fzk3g1lv1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...repairForm, form_type: "repair", submitted_at: new Date().toISOString() }),
      });
      if (response.ok) {
        setRepairSubmitted(true);
        toast({ title: "Repair Request Submitted", description: "Our service team will contact you shortly." });
      } else throw new Error("Failed");
    } catch {
      toast({ title: "Submission Failed", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setRepairSubmitting(false);
    }
  };

  // Reset OTP when switching tabs or changing email
  const resetOtp = () => {
    if (otpStep !== "form") {
      setOtpStep("form");
      setOtpCode("");
      setVerifiedEmail("");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-card border border-gunmetal/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brass-gold/60 focus:ring-1 focus:ring-brass-gold/30 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  const renderEmailFieldWithOtp = (formEmail: string, setFormEmail: (email: string) => void) => (
    <div>
      <label className={labelClass}>Email Address *</label>
      <div className="flex gap-2">
        <input
          type="email"
          required
          className={`${inputClass} flex-1`}
          placeholder="you@company.com"
          value={formEmail}
          onChange={(e) => {
            setFormEmail(e.target.value);
            if (verifiedEmail && e.target.value !== verifiedEmail) resetOtp();
          }}
          disabled={otpStep === "verified"}
        />
        {otpStep === "form" && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSending || !formEmail.includes("@")}
            className="btn-primary px-4 py-3 text-sm whitespace-nowrap flex items-center gap-2"
          >
            {otpSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Verify
          </button>
        )}
        {otpStep === "verified" && (
          <div className="flex items-center gap-1 px-3 bg-defence-green/10 border border-defence-green/30 text-defence-green text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            Verified
          </div>
        )}
      </div>
      {otpStep === "otp" && (
        <div className="mt-3 p-4 bg-card border border-brass-gold/30">
          <p className="text-sm text-muted-foreground mb-2">Enter the 6-digit code sent to <strong>{formEmail}</strong></p>
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
              className="btn-accent px-4 py-3 text-sm flex items-center gap-2"
            >
              {otpVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Confirm
            </button>
          </div>
          <button type="button" onClick={handleSendOtp} disabled={otpSending} className="text-xs text-brass-gold mt-2 hover:underline">
            Resend code
          </button>
        </div>
      )}
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
                  onClick={() => { setActiveTab("enquiry"); resetOtp(); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-sm uppercase tracking-wider transition-colors ${
                    activeTab === "enquiry" ? "bg-defence-green text-white" : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="w-4 h-4" /> New Enquiry
                </button>
                <button
                  onClick={() => { setActiveTab("repair"); resetOtp(); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold text-sm uppercase tracking-wider transition-colors ${
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
                  <form onSubmit={handleEnquirySubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" required className={inputClass} placeholder="Your full name"
                          value={enquiryForm.name} onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })} />
                      </div>
                      {renderEmailFieldWithOtp(enquiryForm.email, (email) => setEnquiryForm({ ...enquiryForm, email }))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input type="tel" required className={inputClass} placeholder="+91 XXXXX XXXXX"
                          value={enquiryForm.phone} onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} />
                      </div>
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
                        <option value="fire-control">Fire Control Systems (AMFDC)</option>
                        <option value="inspection">Gun Barrel Inspection (GBInP)</option>
                        <option value="surveillance">Field Surveillance (FSD/INVSS)</option>
                        <option value="simulators">Simulators & Training</option>
                        <option value="industrial">Industrial Automation</option>
                        <option value="services">Repair & AMC Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Subject *</label>
                      <input type="text" required className={inputClass} placeholder="Brief subject of your enquiry"
                        value={enquiryForm.subject} onChange={(e) => setEnquiryForm({ ...enquiryForm, subject: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Detailed Requirements *</label>
                      <textarea required rows={5} className={inputClass} placeholder="Describe your requirements..."
                        value={enquiryForm.message} onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })} />
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
                  <form onSubmit={handleRepairSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" required className={inputClass} placeholder="Your full name"
                          value={repairForm.name} onChange={(e) => setRepairForm({ ...repairForm, name: e.target.value })} />
                      </div>
                      {renderEmailFieldWithOtp(repairForm.email, (email) => setRepairForm({ ...repairForm, email }))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input type="tel" required className={inputClass} placeholder="+91 XXXXX XXXXX"
                          value={repairForm.phone} onChange={(e) => setRepairForm({ ...repairForm, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass}>Organization / Unit</label>
                        <input type="text" className={inputClass} placeholder="Company / Unit name"
                          value={repairForm.organization} onChange={(e) => setRepairForm({ ...repairForm, organization: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Equipment Name *</label>
                        <input type="text" required className={inputClass} placeholder="e.g. AMFDC MK-II, GBInP-17"
                          value={repairForm.equipment_name} onChange={(e) => setRepairForm({ ...repairForm, equipment_name: e.target.value })} />
                      </div>
                      <div>
                        <label className={labelClass}>Serial Number</label>
                        <input type="text" className={inputClass} placeholder="Equipment serial number"
                          value={repairForm.serial_number} onChange={(e) => setRepairForm({ ...repairForm, serial_number: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Urgency Level</label>
                      <select className={inputClass}
                        value={repairForm.urgency} onChange={(e) => setRepairForm({ ...repairForm, urgency: e.target.value })}>
                        <option value="normal">Normal — Within 7 days</option>
                        <option value="high">High — Within 48 hours</option>
                        <option value="critical">Critical — Immediate attention</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Issue Description *</label>
                      <textarea required rows={5} className={inputClass} placeholder="Describe the issue, symptoms, error codes..."
                        value={repairForm.issue_description} onChange={(e) => setRepairForm({ ...repairForm, issue_description: e.target.value })} />
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
