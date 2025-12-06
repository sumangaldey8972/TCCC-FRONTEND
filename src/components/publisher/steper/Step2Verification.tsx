"use client"

import { Step2VerificationProps } from "@/type/publisher.type"
import { motion } from "framer-motion"
import {
    Globe,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    SkipForward,
    Copy,
    Download,
    Code,
    Server,
    Shield,
    Clock,
    FileText,
    Check,
    Zap
} from "lucide-react"
import { useRef, useState } from "react"

function makeToken(len = 12) {
    return Math.random().toString(36).slice(2, 2 + len).toUpperCase();
}

const Step2Verification = ({
    formData,
    isSubmitting,
    verificationStatus,
    verificationSkipped,
    setVerificationStatus,
    setVerificationSkipped,
    setIsSubmitting,
    setIsPublisherFormSubmitted
}: Step2VerificationProps) => {

    // 🔥 TOKEN IS GENERATED ONCE ONLY
    const tokenRef = useRef(
        formData.verificationToken || makeToken(12)
    );
    const verificationToken = tokenRef.current;

    const [copiedMeta, setCopiedMeta] = useState(false);
    const [copiedDNS, setCopiedDNS] = useState(false);

    // ------------------------------
    // VERIFY WEBSITE
    // ------------------------------
    const verifyWebsite = async () => {
        if (!formData.website) return;

        setVerificationStatus("verifying");

        try {
            const metaCheck = await fetch(
                `/api/check-meta?domain=${formData.website}&token=${verificationToken}`
            ).then(res => res.json()).catch(() => ({ success: false }));

            if (metaCheck.success) {
                setVerificationStatus("verified");
                return;
            }

            const dnsCheck = await fetch(
                `/api/check-dns?domain=${formData.website}&token=${verificationToken}`
            ).then(res => res.json()).catch(() => ({ success: false }));

            if (dnsCheck.success) {
                setVerificationStatus("verified");
                return;
            }

            setVerificationStatus("failed");
        } catch (error) {
            setVerificationStatus("failed");
        }
    };

    const skipVerification = () => {
        setVerificationSkipped(true);
        setVerificationStatus("pending");
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("form submitted", formData, tokenRef.current)
            setIsPublisherFormSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get status styles
    const getStatusStyles = () => {
        switch (verificationStatus) {
            case 'verified':
                return {
                    icon: <CheckCircle className="w-5 h-5" />,
                    color: 'text-green-500',
                    bgColor: 'bg-green-500/10',
                    borderColor: 'border-green-500/20',
                    title: 'Verified Successfully',
                    message: 'Website ownership has been confirmed!'
                };
            case 'failed':
                return {
                    icon: <AlertCircle className="w-5 h-5" />,
                    color: 'text-red-500',
                    bgColor: 'bg-red-500/10',
                    borderColor: 'border-red-500/20',
                    title: 'Verification Failed',
                    message: 'Unable to verify. Please try again or skip.'
                };
            case 'verifying':
                return {
                    icon: <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />,
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-500/10',
                    borderColor: 'border-blue-500/20',
                    title: 'Verifying...',
                    message: 'Checking verification methods...'
                };
            default:
                return {
                    icon: <Globe className="w-5 h-5" />,
                    color: 'text-text-primary/60',
                    bgColor: 'bg-text-primary/5',
                    borderColor: 'border-text-primary/10',
                    title: 'Verification Required',
                    message: 'Choose a verification method below'
                };
        }
    };

    const statusStyles = getStatusStyles();

    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            {/* Header Section */}
            <div className="text-center space-y-4">
                {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-2">
                    <Shield className="w-8 h-8 text-blue-500/80" />
                </div> */}
                <div>
                    <h3 className="text-2xl font-semibold text-text-primary/80 mb-2">
                        Website Verification
                    </h3>
                    <p className="text-sm text-text-primary/60 max-w-md mx-auto">
                        {formData.website
                            ? "Confirm ownership of your website to complete registration"
                            : "Continue with your application"}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            {formData.website ? (
                <div className="space-y-6">
                    {/* Website Preview */}
                    <div className="p-5 border border-text-primary/10 rounded-xl bg-background/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-text-primary/80">Website to Verify</p>
                                    <p className="text-xs text-text-primary/40">Make sure this is your website</p>
                                </div>
                            </div>
                            <a
                                href={formData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-all flex items-center gap-1.5"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Visit
                            </a>
                        </div>
                        <div className="p-3 bg-text-primary/5 rounded-lg border border-text-primary/10">
                            <p className="text-sm font-mono text-text-primary/70 break-all">{formData.website}</p>
                        </div>
                    </div>

                    {/* Verification Methods */}
                    {verificationStatus === "pending" && !verificationSkipped && (
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h4 className="text-lg font-semibold text-text-primary/80">
                                    Choose Verification Method
                                </h4>
                                <p className="text-sm text-text-primary/60">
                                    Select one method to prove website ownership
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                {/* Method 1: HTML Meta Tag */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    className="p-3 md:p-5 border border-text-primary/10 rounded-xl bg-background/40 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                            <Code className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-text-primary/80 mb-1">
                                                HTML Meta Tag
                                            </h5>
                                            <p className="text-xs text-text-primary/60">
                                                Add to your website's &lt;head&gt; section
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="p-3 bg-[#1a1a1a] text-green-400/90 rounded-lg text-xs font-mono border border-green-500/20">
                                                {`<meta name="the-coin-cartel" content="${verificationToken}" />`}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const meta = `<meta name="the-coin-cartel" content="${verificationToken}" />`;
                                                    navigator.clipboard.writeText(meta);
                                                    setCopiedMeta(true);
                                                    setTimeout(() => setCopiedMeta(false), 2000);
                                                }}
                                                className="absolute top-2 right-2 px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                                            >
                                                {copiedMeta ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-text-primary/40">
                                            <Clock className="w-3 h-3" />
                                            <span>Detected within 1-2 minutes</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Method 2: DNS TXT Record */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    className="p-3 md:p-5 border border-text-primary/10 rounded-xl bg-background/40 hover:border-purple-500/30 transition-all group"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                            <Server className="w-5 h-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-text-primary/80 mb-1">
                                                DNS TXT Record
                                            </h5>
                                            <p className="text-xs text-text-primary/60">
                                                Add to your domain's DNS settings
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <div className="p-3 bg-[#1a1a1a] text-purple-400/90 rounded-lg text-xs font-mono border border-purple-500/20">
                                                {`the-coin-cartel = ${verificationToken}`}
                                            </div>
                                            <div className="absolute top-2 right-2 flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        const dns = `the-coin-cartel = ${verificationToken}`;
                                                        navigator.clipboard.writeText(dns);
                                                        setCopiedDNS(true);
                                                        setTimeout(() => setCopiedDNS(false), 2000);
                                                    }}
                                                    className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                                                >
                                                    {copiedDNS ? (
                                                        <>
                                                            <Check className="w-3 h-3" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3 h-3" />
                                                            Copy
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const txtContent = `the-coin-cartel=${verificationToken}`;
                                                        const blob = new Blob([txtContent], { type: "text/plain" });
                                                        const url = URL.createObjectURL(blob);
                                                        const a = document.createElement("a");
                                                        a.href = url;
                                                        a.download = "the-coin-cartel.txt";
                                                        a.click();
                                                        URL.revokeObjectURL(url);
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                                                >
                                                    <Download className="w-3 h-3" />
                                                    TXT
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-text-primary/40">
                                            <Clock className="w-3 h-3" />
                                            <span>DNS may take up to 24 hours</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Help Text */}
                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-500 mb-1">Need help?</p>
                                        <p className="text-xs text-text-primary/60">
                                            After adding the verification to your website, click "Verify Now".
                                            If you're not the website owner, you can skip this step and verify later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {verificationSkipped && (
                        <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/20 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-amber-600 mb-1">Verification Skipped</p>
                                    <p className="text-xs text-amber-600/70">
                                        You can verify your website later from your publisher dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-text-primary/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Pending State */}
                            {!verificationSkipped && verificationStatus === 'pending' && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={verifyWebsite}
                                        className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        <Zap className="w-4 h-4" />
                                        <span className="text-sm font-semibold">Verify Now</span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={skipVerification}
                                        className="py-3 px-6 border border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5 text-text-primary/70 font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        <SkipForward className="w-4 h-4" />
                                        <span className="text-sm font-semibold">Skip Verification</span>
                                    </motion.button>
                                </>
                            )}

                            {/* Verifying State */}
                            {verificationStatus === 'verifying' && (
                                <div className="col-span-2 py-3 px-6 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                    <span className="text-sm font-medium text-blue-500">Verifying website...</span>
                                </div>
                            )}

                            {/* Verified/Failed/Skipped State */}
                            {(verificationStatus === 'verified' || verificationStatus === 'failed' || verificationSkipped) && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="col-span-2 py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="text-sm font-semibold">Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-sm font-semibold">Submit Application</span>
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* No Website Provided Section - FIXED RENDERING */
                <div className="space-y-6">
                    <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-blue-500 mb-1">No Website Provided</p>
                                <p className="text-xs text-text-primary/60">
                                    You haven't provided a website URL. You can submit your application directly
                                    and add a website later from your publisher dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span className="text-sm font-semibold">Submitting...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-semibold">Submit Application</span>
                            </>
                        )}
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default Step2Verification;