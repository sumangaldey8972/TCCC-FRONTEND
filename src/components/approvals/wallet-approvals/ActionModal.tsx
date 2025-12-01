"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Transaction } from "@/type/transaction";
import { useState } from "react";
import appClient from "@/lib/appClient";
import { useAppSelector } from "@/store/hooks/hooks";

interface ActionModalProps {
    transaction: Transaction;
    onClose: () => void;
    onActionComplete: () => void;
}

type ActionType = 'approved' | 'rejected' | 'pause' | 'on-hold';

const ActionModal = ({ transaction, onClose, onActionComplete }: ActionModalProps) => {
    console.log({ transaction })
    const [action, setAction] = useState<ActionType>('approved');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'select' | 'confirm'>('select');

    const actionConfig = {
        'approved': {
            label: 'Approve',
            description: 'Approve this transaction request',
            icon: '✅',
            color: 'bg-green-500',
            textColor: 'text-green-600',
            borderColor: 'border-green-200',
            bgColor: 'bg-green-50',
            buttonColor: 'bg-green-600 hover:bg-green-700'
        },
        'rejected': {
            label: 'Reject',
            description: 'Reject this transaction request',
            icon: '❌',
            color: 'bg-red-500',
            textColor: 'text-red-600',
            borderColor: 'border-red-200',
            bgColor: 'bg-red-50',
            buttonColor: 'bg-red-600 hover:bg-red-700'
        },
        'pause': {
            label: 'Pause',
            description: 'Temporarily pause this transaction',
            icon: '⏸️',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600',
            borderColor: 'border-yellow-200',
            bgColor: 'bg-yellow-50',
            buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
        },
        'on-hold': {
            label: 'On Hold',
            description: 'Put this transaction on hold for review',
            icon: '⏳',
            color: 'bg-blue-500',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200',
            bgColor: 'bg-blue-50',
            buttonColor: 'bg-blue-600 hover:bg-blue-700'
        }
    };

    const authedUser = useAppSelector((state) => state.auth.user)
    const userId = authedUser?._id

    const handleSubmit = async () => {
        setLoading(true);
        const payload = {
            transactionId: transaction._id,
            action: action,
            remarks: remarks,
            userId: userId,
            userEmail: transaction.userId.email
        }
        console.log({ payload })
        try {
            const response = await appClient.post('/api/approvals/wallet-approvals/action', payload);

            if (response.data.status) {
                onActionComplete();
            }
        } catch (error) {
            console.error('Error taking action:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'approved': 'bg-green-100 text-green-800 border-green-200',
            'rejected': 'bg-red-100 text-red-800 border-red-200',
            'pause': 'bg-purple-100 text-purple-800 border-purple-200',
            'on-hold': 'bg-blue-100 text-blue-800 border-blue-200'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <motion.div
                className="bg-background rounded-2xl p-6 w-full max-w-3xl shadow-2xl border border-text-primary/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-text-primary">
                            Transaction Action
                        </h3>
                        <p className="text-text-primary/60 mt-1 text-sm">
                            Manage transaction status and take appropriate action
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-text-primary/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Transaction Details */}
                    <motion.div
                        variants={cardVariants}
                        className="space-y-4"
                    >
                        <div className="bg-gradient-to-br from-text-primary/5 to-text-primary/10 rounded-xl p-5 border border-text-primary/10">
                            <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Transaction Details
                            </h4>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-text-primary/70">User:</span>
                                    <div className="text-right">
                                        <div className="font-medium text-text-primary">{transaction.userId.userName}</div>
                                        <div className="text-xs text-text-primary/50">{transaction.userId.email}</div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-text-primary/70">Amount:</span>
                                    <span className="font-bold text-lg text-text-primary">
                                        {transaction.amount.toLocaleString()} {transaction.currencyType.toUpperCase()}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-text-primary/70">Type:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${transaction.transactionType === 'add'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {transaction.transactionType}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-text-primary/70">Current Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-text-primary/70">Created:</span>
                                    <span className="text-text-primary text-sm">
                                        {new Date(transaction.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction ID */}
                        {transaction.transactionId && (
                            <div className="bg-text-primary/5 rounded-lg p-4 border border-text-primary/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-text-primary/70 text-sm">Transaction ID:</span>
                                    <code className="text-xs bg-text-primary/10 px-2 py-1 rounded text-text-primary font-mono">
                                        {transaction.transactionId}
                                    </code>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Side - Action Selection */}
                    <motion.div
                        variants={cardVariants}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <AnimatePresence mode="wait">
                            {step === 'select' ? (
                                <motion.div
                                    key="select"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <h4 className="font-semibold text-text-primary flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Select Action
                                    </h4>

                                    <div className="grid grid-cols-2 gap-3">
                                        {(Object.entries(actionConfig) as [ActionType, typeof actionConfig.approved][]).map(([actionType, config]) => (
                                            <motion.button
                                                key={actionType}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setAction(actionType);
                                                    setStep('confirm');
                                                }}
                                                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${action === actionType
                                                    ? `${config.borderColor} ring-2 ring-offset-2 ring-opacity-50`
                                                    : 'border-text-primary/20 hover:border-text-primary/30 bg-text-primary/5'
                                                    }`}
                                            >
                                                {/* <div className="text-xl mb-2">{config.icon}</div> */}
                                                <div className="font-semibold text-text-primary">{config.label}</div>
                                                <div className="text-xs text-text-primary/60 mt-1">{config.description}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-text-primary">Confirm Action</h4>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setStep('select')}
                                            className="text-sm text-text-primary/70 hover:text-text-primary flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back
                                        </motion.button>
                                    </div>

                                    {/* Selected Action Preview */}
                                    <div className={`p-4 rounded-xl border-2 ${actionConfig[action].borderColor}`}>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-semibold text-sm text-text-primary">Changing to: {actionConfig[action].label}</div>
                                                <div className="text-xs text-text-primary/60">{actionConfig[action].description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary mb-2">
                                            Remarks (Optional)
                                        </label>
                                        <textarea
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            placeholder="Add any notes or reasons for this action..."
                                            className="w-full px-4 py-3 border border-text-primary/20 rounded-lg text-sm bg-background text-text-primary resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            rows={4}
                                        />
                                        <div className="text-xxs text-text-primary/50 mt-1">
                                            This will be visible to the user and logged in the system.
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 text-sm border border-text-primary/20 rounded-lg text-text-primary hover:bg-text-primary/5 transition-colors font-medium"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className={`flex-1 px-6 py-3 text-sm text-white rounded-lg transition-all font-medium ${actionConfig[action].buttonColor} disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                                    />
                                                    Processing...
                                                </div>
                                            ) : (
                                                `Confirm ${actionConfig[action].label}`
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ActionModal;