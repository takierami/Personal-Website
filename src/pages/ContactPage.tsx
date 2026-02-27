import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, Check, AlertCircle, MessageCircle, Linkedin, Github, Twitter, Code } from "lucide-react";
import { profileData, socialLinks } from "../data/mockData";
import type { ContactFormData } from "../types";

export const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          budget: "",
          timeline: "",
        });
        // Reset after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full"
          >
            <span className="font-mono text-sm text-blue-400">Get In Touch</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <br />
            <span className="text-white/40">Amazing Together</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'm always open to discussing new opportunities,
            creative ideas, or partnerships.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Mail className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="font-mono text-sm text-white/60">Email</h3>
                </div>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-white hover:text-cyan-400 transition-colors block"
                >
                  {profileData.email}
                </a>
                <a
                  href="mailto:contact@takieddinerami.tech"
                  className="text-white hover:text-cyan-400 transition-colors block mt-1"
                >
                  contact@takieddinerami.tech
                </a>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Phone className="text-purple-400" size={20} />
                  </div>
                  <h3 className="font-mono text-sm text-white/60">Phone</h3>
                </div>
                <div className="space-y-2">
                  <a
                    href={`tel:${profileData.phone}`}
                    className="block text-white hover:text-purple-400 transition-colors"
                  >
                    {profileData.phone}
                  </a>
                  <a
                    href={`tel:${profileData.phoneSecondary}`}
                    className="block text-white/70 hover:text-purple-400 transition-colors text-sm"
                  >
                    {profileData.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <MessageCircle className="text-green-400" size={20} />
                  </div>
                  <h3 className="font-mono text-sm text-white/60">WhatsApp</h3>
                </div>
                <a
                  href={profileData.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <MapPin className="text-orange-400" size={20} />
                  </div>
                  <h3 className="font-mono text-sm text-white/60">Location</h3>
                </div>
                <p className="text-white">{profileData.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10">
              <h3 className="font-mono text-sm text-white/60 mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  // Map icon names to actual Lucide components
                  const IconComponent =
                    social.icon === 'Linkedin' ? Linkedin :
                      social.icon === 'Github' ? Github :
                        social.icon === 'Twitter' ? Twitter :
                          social.icon === 'Mail' ? Mail :
                            social.icon === 'Code' ? Code :
                              Mail; // default fallback

                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                      title={social.platform}
                    >
                      <IconComponent
                        size={20}
                        style={{ color: social.color }}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="sr-only">{social.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-mono text-sm text-green-400">Currently Available</span>
              </div>
              <p className="text-sm text-white/60">
                {profileData.availability}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              {/* Web3Forms hidden fields */}
              <input type="hidden" name="access_key" value="7640d186-331d-431e-927d-590d10842363" />
              <input type="hidden" name="subject" value="New message from portfolio" />
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              {/* Honeypot spam prevention */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-white/70 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                      } rounded-lg focus:outline-none focus:border-cyan-500 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-white/70 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                      } rounded-lg focus:outline-none focus:border-cyan-500 transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-mono text-white/70 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.subject ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:border-cyan-500 transition-colors`}
                  placeholder="Project Discussion"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-mono text-white/70 mb-2">
                    Budget (Optional)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    style={{ color: '#111827' }}
                  >
                    <option value="" style={{ color: '#111827' }}>Select range</option>
                    <option value="<10k" style={{ color: '#111827' }}>&lt; $10,000</option>
                    <option value="10k-25k" style={{ color: '#111827' }}>$10,000 - $25,000</option>
                    <option value="25k-50k" style={{ color: '#111827' }}>$25,000 - $50,000</option>
                    <option value=">50k" style={{ color: '#111827' }}>&gt; $50,000</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-mono text-white/70 mb-2">
                    Timeline (Optional)
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    style={{ color: '#111827' }}
                  >
                    <option value="" style={{ color: '#111827' }}>Select timeline</option>
                    <option value="asap" style={{ color: '#111827' }}>ASAP</option>
                    <option value="1-3months" style={{ color: '#111827' }}>1-3 months</option>
                    <option value="3-6months" style={{ color: '#111827' }}>3-6 months</option>
                    <option value="flexible" style={{ color: '#111827' }}>Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-mono text-white/70 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: status === "idle" || status === "error" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" || status === "error" ? 0.98 : 1 }}
                className={`w-full px-8 py-4 rounded-lg font-mono font-semibold flex items-center justify-center gap-2 transition-all ${status === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === "loading" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check size={20} />
                    Message Sent!
                  </>
                )}
                {(status === "idle" || status === "error") && (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};