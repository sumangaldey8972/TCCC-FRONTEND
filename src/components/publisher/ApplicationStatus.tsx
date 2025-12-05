
import { motion } from "framer-motion"
import { CheckCircle, Clock } from "lucide-react"


const ApplicationStatus = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
        >
            <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-600/30 to-amber-500/20 animate-gradient-x">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-shine" />

                <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 mb-4">
                            <Clock className="w-8 h-8 text-amber-500/80" />
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary/80 mb-2">
                            Application Under Review
                        </h2>
                        <p className="text-text-primary/60 text-sm">
                            We're reviewing your publisher application
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-amber-500/80" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-text-primary/80 mb-2">
                                        Application Submitted Successfully!
                                    </h3>
                                    <p className="text-text-primary/60 text-sm mb-4">
                                        Thank you for submitting your publisher application. Our team is currently reviewing your details.
                                    </p>
                                </div>

                                <div className="w-full space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-text-primary/60">Status</span>
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium">
                                            Under Review
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-text-primary/60">Estimated Time</span>
                                        <span className="text-sm font-medium text-text-primary/80">24-48 hours</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-text-primary/60">Contact Email</span>
                                        <span className="text-sm font-medium text-text-primary/80">support@example.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-text-primary/80 text-sm">What happens next?</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs text-amber-500 font-medium">1</span>
                                    </div>
                                    <p className="text-sm text-text-primary/60">
                                        Our team reviews your website and traffic details
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs text-amber-500 font-medium">2</span>
                                    </div>
                                    <p className="text-sm text-text-primary/60">
                                        We verify ad placement compatibility
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs text-amber-500 font-medium">3</span>
                                    </div>
                                    <p className="text-sm text-text-primary/60">
                                        You'll receive an email notification with the result
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full py-3 px-4 bg-gradient-to-r from-text-primary to-text-primary/90 hover:from-text-primary/90 hover:to-text-primary disabled:opacity-50 text-background font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-text-primary/30"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ApplicationStatus