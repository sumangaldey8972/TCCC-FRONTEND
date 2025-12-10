"use client"

import { Step2VerificationProps } from "@/type/publisher.type"
import { motion, AnimatePresence } from "framer-motion"
import {
    Globe,
    CheckCircle,
    AlertCircle,
    ExternalLink,
    SkipForward,
    Copy,
    Code,
    Clock,
    FileText,
    Check,
    Zap,
    X,
    Shield,
    Loader2
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface VerificationModalProps {
    isOpen: boolean
    onClose: () => void
    formData: Step2VerificationProps['formData']
    verificationStatus: Step2VerificationProps['verificationStatus']
    verificationSkipped: Step2VerificationProps['verificationSkipped']
    setVerificationStatus: (status: 'pending' | 'verifying' | 'verified' | 'failed') => void
    setVerificationSkipped: (skipped: boolean) => void

}

const VerificationModal = ({
    isOpen,
    onClose,
    formData,
    verificationStatus,
    verificationSkipped,
    setVerificationSkipped,
    setVerificationStatus,

}: VerificationModalProps) => {
    const [copiedMeta, setCopiedMeta] = useState(false)
    const verificationToken = formData.verificationToken
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

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

            setVerificationStatus("failed");
        } catch (error) {
            setVerificationStatus("failed");
        }
    };

    const skipVerification = () => {
        setVerificationSkipped(true);
        setVerificationStatus("pending");
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isMounted) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Content */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-full">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                Website Verification
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Confirm ownership of your website
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="space-y-6">
                                        {formData.website ? (
                                            <>
                                                {/* Website Preview */}
                                                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    Website to Verify
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Make sure this is your website
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={formData.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg transition-all flex items-center gap-1.5"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            Visit
                                                        </a>
                                                    </div>
                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                                                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                                                            {formData.website}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Verification Methods */}
                                                {verificationStatus === "pending" && !verificationSkipped && (
                                                    <div className="space-y-6">
                                                        <div className="text-center space-y-2">
                                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                Choose Verification Method
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                Select one method to prove website ownership
                                                            </p>
                                                        </div>

                                                        {/* HTML Meta Tag Method */}
                                                        <motion.div
                                                            whileHover={{ y: -2 }}
                                                            className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                                                        >
                                                            <div className="flex items-start gap-3 mb-4">
                                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                                                                    <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                                                        HTML Meta Tag
                                                                    </h5>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        Add to your website&apos;s &lt;head&gt; section
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="relative">
                                                                    <div className="p-3 bg-gray-900 dark:bg-black text-green-400/90 rounded-lg text-xs font-mono border border-green-500/20">
                                                                        {`<meta name="the-coin-cartel" content="${verificationToken}" />`}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => {
                                                                            const meta = `<meta name="the-coin-cartel" content="${verificationToken}" />`
                                                                            navigator.clipboard.writeText(meta)
                                                                            setCopiedMeta(true)
                                                                            setTimeout(() => setCopiedMeta(false), 2000)
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
                                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>Detected within 1-2 minutes</span>
                                                                </div>
                                                            </div>
                                                        </motion.div>

                                                        {/* Help Text */}
                                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                                            <div className="flex items-start gap-3">
                                                                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                                                <div>
                                                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                                                                        Need help?
                                                                    </p>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        After adding the verification to your website, click &quot;Verify Now&quot;.
                                                                        If you&apos;re not the website owner, you can skip this step and verify later.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {verificationSkipped && (
                                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                                                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                                                    You can verify your website later from your publisher dashboard.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Verification Status */}
                                                {verificationStatus === 'verifying' && (
                                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                                        <div className="flex items-center justify-center gap-3">
                                                            <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                Verifying website...
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {verificationStatus === 'verified' && (
                                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                                                    Website verified successfully!
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {verificationStatus === 'failed' && (
                                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                                                                    Verification failed. Please try again or skip for now.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            /* No Website Section */
                                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                                                            No Website Provided
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            You haven&apos;t provided a website URL. You can submit your application directly
                                                            and add a website later.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer with Action Buttons */}
                                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {formData.website ? (
                                            <>
                                                {!verificationSkipped && verificationStatus === 'pending' && (
                                                    <>
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={verifyWebsite}
                                                            // disabled={verificationStatus === 'verifying'}
                                                            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >

                                                            <Zap className="w-4 h-4" />
                                                            <span>Verify Now</span>

                                                        </motion.button>

                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={skipVerification}
                                                            className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                            <SkipForward className="w-4 h-4" />
                                                            <span>Verify Later</span>
                                                        </motion.button>
                                                    </>
                                                )}

                                                {(verificationStatus === 'verified' || verificationStatus === 'failed' || verificationSkipped) && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={onClose}
                                                        className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300"
                                                    >
                                                        Continue
                                                    </motion.button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex gap-3 w-full">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={onClose}
                                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300"
                                                >
                                                    Continue
                                                </motion.button>
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onClose}
                                            className="py-3 px-6 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 sm:hidden"
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export default VerificationModal