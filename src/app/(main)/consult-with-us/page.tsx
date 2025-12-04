"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Mail,
    Users,
    CheckCircle,
    Send,
    Clock,
    DollarSign,
    Shield,
    Rocket,
    TrendingUp,
    MessageCircle,
    Star,
    User,
    MessageSquare,
    Sparkles,
    Zap,
    Target,
    ArrowRight,
    ChevronRight,
    Calendar,
    Video,
    Briefcase,
    Globe
} from "lucide-react";
import appClient from "@/lib/appClient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect, TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const ConsultWithUsPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);


    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters')
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        telegram: Yup.string()
            .matches(/^@?[a-zA-Z0-9_]{5,32}$/, 'Invalid Telegram username')
            .notRequired(),
        topic: Yup.string()
            .required('Please select a consultation topic'),
        message: Yup.string()
            .max(500, 'Message must be less than 500 characters')
            .notRequired()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            telegram: "",
            topic: "",
            message: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const response = await appClient.post("/api/consultation/create", values);
                if (response.data.status) {
                    setIsSubmitted(true);
                }
            } catch (error) {
                console.error("Submission error:", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    const consultationTopics = [
        { value: "token-launch", label: "Token Launch", icon: <Rocket className="w-4 h-4" /> },
        { value: "marketing", label: "Marketing", icon: <TrendingUp className="w-4 h-4" /> },
        { value: "listing", label: "Listings", icon: <Shield className="w-4 h-4" /> },
        { value: "community", label: "Community", icon: <Users className="w-4 h-4" /> },
        { value: "technical", label: "Technical", icon: <Zap className="w-4 h-4" /> },
        { value: "other", label: "Other", icon: <MessageCircle className="w-4 h-4" /> },
    ];

    const features = [
        { icon: <Clock className="w-4 h-4" />, text: "24h Response" },
        { icon: <Target className="w-4 h-4" />, text: "Goal Focused" },
        { icon: <Video className="w-4 h-4" />, text: "Video Call" },
        { icon: <Calendar className="w-4 h-4" />, text: "Flexible Time" },
        { icon: <Briefcase className="w-4 h-4" />, text: "Pro Advice" },
        { icon: <Globe className="w-4 h-4" />, text: "Global Reach" }
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary relative overflow-hidden" ref={containerRef}>
            {/* Flickering Background Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.05]" style={{
                    backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
                                   linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                }} />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                    {/* Left Column - Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-lg bg-text-primary/5 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-text-primary/60" />
                                </div>
                                <div>
                                    {/* <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                                        Crypto Strategy Session
                                    </h1> */}
                                    <TextGenerateEffect words="Crypto Strategy Session" />
                                    <p className="text-sm text-text-primary/60">
                                        Expert guidance at $49/hour
                                    </p>
                                </div>
                            </motion.div>

                            <TypewriterEffectSmooth words={
                                [
                                    { text: "Get" },
                                    { text: "professional" },
                                    { text: "advice" },
                                    { text: "from" },
                                    { text: "industry" },
                                    { text: "experts" },
                                    { text: "$49 per hour", className: "font-semibold text-text-primary" },
                                    { text: "for" },
                                    { text: "actionable" },
                                    { text: "insights." }
                                ]
                            } />

                            {/* <p className="text-text-primary/70 leading-relaxed text-sm sm:text-base">
                                Get professional advice from industry experts.
                                <span className="font-semibold text-text-primary"> $49 per hour</span> for actionable insights.
                            </p> */}
                        </div>

                        {/* Pricing Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-background border border-text-primary/10 rounded-xl p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-text-primary/5 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-text-primary">$49</div>
                                        <div className="text-xs text-text-primary/50">per 60 minutes</div>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-8 h-8 rounded-full border border-text-primary/10 flex items-center justify-center"
                                >
                                    <Star className="w-4 h-4 text-text-primary/60" />
                                </motion.div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-text-primary/60">
                                <Clock className="w-3 h-3" />
                                <span>Flexible scheduling • Money-back guarantee</span>
                            </div>
                        </motion.div>

                        {/* Features - Compact Grid */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-text-primary">What's Included</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + index * 0.05 }}
                                        className="flex items-center gap-2 p-2 rounded-lg bg-background border border-text-primary/5 hover:border-text-primary/10 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="p-1 rounded bg-text-primary/5">
                                            {feature.icon}
                                        </div>
                                        <span className="text-xs font-medium text-text-primary/80 truncate">
                                            {feature.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-3 gap-3 pt-4 border-t border-text-primary/10"
                        >
                            <div className="text-center">
                                <div className="text-lg font-bold text-text-primary">50+</div>
                                <div className="text-xs text-text-primary/50">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-text-primary">$100M</div>
                                <div className="text-xs text-text-primary/50">Raised</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-text-primary">98%</div>
                                <div className="text-xs text-text-primary/50">Satisfied</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Form with Animated Beam */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-6"
                    >
                        <div className="relative" ref={formContainerRef}>
                            {/* Animated Beam Container */}

                            {/* Form Container */}
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-background border border-text-primary/10 rounded-xl shadow-sm overflow-hidden relative"
                            >
                                {/* Form Header */}
                                <div className="p-4 border-b border-text-primary/10 bg-background">
                                    <h2 className="text-lg font-bold text-text-primary">
                                        Book Your Session
                                    </h2>
                                    <p className="text-xs text-text-primary/60 mt-1">Complete the form below</p>
                                </div>

                                {/* Form Content */}
                                <div className="p-4">
                                    <AnimatePresence mode="wait">
                                        {!isSubmitted ? (
                                            <motion.div
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <form onSubmit={formik.handleSubmit} className="space-y-4">
                                                    {/* Name Field */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-text-primary/80 mb-1">
                                                            Full Name *
                                                        </label>
                                                        <div className="relative">
                                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-primary/40" />
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={formik.values.name}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                required
                                                                placeholder="John Doe"
                                                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-background border focus:outline-none transition-all ${formik.touched.name && formik.errors.name
                                                                    ? 'border-red-300 focus:ring-1 focus:ring-red-200'
                                                                    : 'border-text-primary/20 focus:border-text-primary/40 focus:ring-1 focus:ring-text-primary/20'
                                                                    }`}
                                                            />
                                                        </div>
                                                        {formik.touched.name && formik.errors.name && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-1"
                                                            >
                                                                {formik.errors.name}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {/* Email Field */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-text-primary/80 mb-1">
                                                            Email *
                                                        </label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-primary/40" />
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formik.values.email}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                required
                                                                placeholder="john@example.com"
                                                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-background border focus:outline-none transition-all ${formik.touched.email && formik.errors.email
                                                                    ? 'border-red-300 focus:ring-1 focus:ring-red-200'
                                                                    : 'border-text-primary/20 focus:border-text-primary/40 focus:ring-1 focus:ring-text-primary/20'
                                                                    }`}
                                                            />
                                                        </div>
                                                        {formik.touched.email && formik.errors.email && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-1"
                                                            >
                                                                {formik.errors.email}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {/* Telegram Field */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-text-primary/80 mb-1">
                                                            Telegram (Optional)
                                                        </label>
                                                        <div className="relative">
                                                            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-primary/40" />
                                                            <input
                                                                type="text"
                                                                name="telegram"
                                                                value={formik.values.telegram}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="@username"
                                                                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-background border focus:outline-none transition-all ${formik.touched.telegram && formik.errors.telegram
                                                                    ? 'border-red-300 focus:ring-1 focus:ring-red-200'
                                                                    : 'border-text-primary/20 focus:border-text-primary/40 focus:ring-1 focus:ring-text-primary/20'
                                                                    }`}
                                                            />
                                                        </div>
                                                        {formik.touched.telegram && formik.errors.telegram && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-1"
                                                            >
                                                                {formik.errors.telegram}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {/* Topic Selection */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-text-primary/80 mb-1">
                                                            Topic *
                                                        </label>
                                                        <div className="relative">
                                                            <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-primary/40 z-10" />
                                                            <select
                                                                name="topic"
                                                                value={formik.values.topic}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                required
                                                                className={`w-full pl-9 pr-8 py-2 text-sm rounded-lg bg-background border focus:outline-none transition-all appearance-none ${formik.touched.topic && formik.errors.topic
                                                                    ? 'border-red-300 focus:ring-1 focus:ring-red-200'
                                                                    : 'border-text-primary/20 focus:border-text-primary/40 focus:ring-1 focus:ring-text-primary/20'
                                                                    }`}
                                                            >
                                                                <option value="">Select topic</option>
                                                                {consultationTopics.map((topic) => (
                                                                    <option key={topic.value} value={topic.value}>
                                                                        {topic.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-primary/40 rotate-90 pointer-events-none" />
                                                        </div>
                                                        {formik.touched.topic && formik.errors.topic && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-400 text-xs mt-1"
                                                            >
                                                                {formik.errors.topic}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    {/* Message Field */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-text-primary/80 mb-1">
                                                            Details (Optional)
                                                        </label>
                                                        <textarea
                                                            name="message"
                                                            value={formik.values.message}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            rows={3}
                                                            placeholder="Briefly describe your project..."
                                                            className={`w-full px-3 py-2 text-sm rounded-lg bg-background border focus:outline-none transition-all resize-none ${formik.touched.message && formik.errors.message
                                                                ? 'border-red-300 focus:ring-1 focus:ring-red-200'
                                                                : 'border-text-primary/20 focus:border-text-primary/40 focus:ring-1 focus:ring-text-primary/20'
                                                                }`}
                                                        />
                                                        <div className="flex justify-between items-center mt-1">
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-red-400 text-xs"
                                                            >
                                                                {formik.touched.message && formik.errors.message}
                                                            </motion.p>
                                                            <span className="text-xs text-text-primary/40">
                                                                {formik.values.message.length}/500
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Price Display */}
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="p-3 rounded-lg bg-background border border-text-primary/10"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="w-4 h-4 text-text-primary" />
                                                                <div>
                                                                    <div className="font-bold text-text-primary text-sm">$49</div>
                                                                    <div className="text-xs text-text-primary/50">60-minute session</div>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-text-primary/50 text-right">
                                                                Money-back guarantee
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Submit Button */}
                                                    <motion.button
                                                        type="submit"
                                                        disabled={isLoading || !formik.isValid}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="w-full py-3 font-semibold rounded-lg bg-text-primary text-background hover:bg-text-primary/90 transition-colors flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <div className="absolute inset-0 bg-white/10 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                                        {isLoading ? (
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                            />
                                                        ) : (
                                                            <>
                                                                <Send className="w-4 h-4" />
                                                                Book Now - $49
                                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </>
                                                        )}
                                                    </motion.button>
                                                </form>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-center py-6"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 200 }}
                                                    className="w-12 h-12 mx-auto mb-4 rounded-full bg-text-primary/5 flex items-center justify-center"
                                                >
                                                    <CheckCircle className="w-6 h-6 text-text-primary" />
                                                </motion.div>
                                                <h3 className="text-lg font-bold text-text-primary mb-2">
                                                    Booked Successfully!
                                                </h3>
                                                <p className="text-text-primary/70 text-sm mb-3">
                                                    We'll contact you within 24 hours.
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        setIsSubmitted(false);
                                                        formik.resetForm();
                                                    }}
                                                    className="px-4 py-2 border border-text-primary/20 text-text-primary rounded-lg hover:bg-text-primary/5 transition-colors text-sm"
                                                >
                                                    Book Another Session
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 mt-4 text-text-primary/40"
                        >
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                <span className="text-xs">Secure</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span className="text-xs">24h</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span className="text-xs">Expert</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes flicker {
                    0%, 100% {
                        opacity: 0;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(1.2);
                    }
                    80% {
                        opacity: 0.2;
                        transform: scale(0.8);
                    }
                }

                @keyframes beamPulse {
                    0% {
                        opacity: 0;
                        transform: rotate(var(--angle)) translateX(-50%) scaleX(0);
                    }
                    50% {
                        opacity: 0.6;
                        transform: rotate(var(--angle)) translateX(-50%) scaleX(1);
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(var(--angle)) translateX(-50%) scaleX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ConsultWithUsPage;