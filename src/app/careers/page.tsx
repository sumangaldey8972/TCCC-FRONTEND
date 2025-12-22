import { Mail, Briefcase, Calendar, Lock, CheckCircle, MapPin, Clock, Users, ArrowRight, Star } from "lucide-react";

/* ---------------- JOBS DATA ---------------- */

const jobs = [
    {
        id: "creative-designer",
        title: "Creative Designer / Creative Intern",
        workType: "Remote",
        employmentType: "Internship / Full-Time",
        experience: "Freshers & Experienced",
        publishedAt: "04th December 2025",
        status: "Closed",
        email: "thecartel@samdigitalsolutions.ai",
        description:
            "We are looking for a creative and enthusiastic individual who is passionate about design and visual storytelling. This role offers hands-on exposure across branding, design, and digital content.",
        responsibilities: [],
        skills: [
            "Video Editing",
            "Graphic Design",
            "Figma Design",
            "Creativity & Attention to Detail",
        ],
        perks: [
            "Work from anywhere",
            "Hands-on industry experience",
            "Creative exposure",
            "Career growth opportunities",
        ],
    },
    {
        id: "marketing-seo-specialist",
        title: "Marketing & SEO Specialist",
        workType: "Remote",
        employmentType: "Full-Time / Part-Time",
        experience: "1–2+ Years",
        publishedAt: "03rd December 2025",
        status: "Open",
        email: "thecartel@samdigitalsolutions.ai",
        description:
            "We're looking for a growth-focused Marketing & SEO Specialist to help scale our digital presence, improve organic reach, and manage community-driven growth initiatives.",
        responsibilities: [
            "Run social media marketing campaigns",
            "Improve website SEO (on-page & off-page)",
            "Perform keyword research & analytics",
            "Manage and grow Telegram / Discord communities",
            "Coordinate content promotion & partnerships",
            "Track performance metrics and optimize growth",
        ],
        skills: [
            "1–2+ years of experience in Digital Marketing & SEO",
            "Familiarity with SEO tools",
            "Strong communication & analytical skills",
            "Ability to work independently",
            "Crypto / blockchain knowledge (preferred, not mandatory)",
        ],
        perks: [
            "Remote-first culture",
            "Growth-focused startup environment",
            "Creative freedom & ownership",
            "Opportunity to scale with the company",
        ],
    }
];

/* ---------------- BENEFITS DATA ---------------- */

const benefits = [
    {
        icon: <MapPin className="w-3 h-3 md:w-6 md:h-6" />,
        title: "Remote First",
        description: "Work from anywhere in the world"
    },
    {
        icon: <Clock className="w-3 h-3 md:w-6 md:h-6" />,
        title: "Flexible Hours",
        description: "Manage your own schedule"
    },
    {
        icon: <Users className="w-3 h-3 md:w-6 md:h-6" />,
        title: "Diverse Team",
        description: "Collaborate with global talents"
    },
    {
        icon: <Star className="w-3 h-3 md:w-6 md:h-6" />,
        title: "Growth Focused",
        description: "Regular learning opportunities"
    }
];

/* ---------------- PAGE ---------------- */

export default function CareersPage() {
    const openPositions = jobs.filter(job => job.status === "Open").length;

    return (
        <main className="min-h-screen bg-background text-text-primary">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6 sm:space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-text-primary/10 bg-text-primary/5 text-sm sm:text-base mb-4">
                            <Users className="w-4 h-4" />
                            <span>Join Our Team</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            Build The Future
                            <span className="block text-text-primary/70 mt-2">
                                With The Cartel
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-text-primary/60 text-base sm:text-lg md:text-xl leading-relaxed">
                            We're building the future of digital media, Web3, and growth-driven platforms.
                            Join us and grow with purpose.
                        </p>

                        <div className="pt-4">
                            <div className="inline-flex items-center gap-4 bg-text-primary/5 border border-text-primary/10 rounded-full px-6 py-3">
                                <span className="text-sm sm:text-base">Open Positions:</span>
                                <span className="text-2xl sm:text-3xl font-bold">{openPositions}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
                            Why Join The Cartel?
                        </h2>
                        <p className="text-sm md:text-xl text-text-primary/60 max-w-2xl mx-auto">
                            We believe in creating an environment where talented individuals can thrive
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-2 md:p-6 rounded-sm md:rounded-2xl border border-text-primary/10 bg-text-primary/5 hover:bg-text-primary/10 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-1 md:p-3 rounded-lg bg-text-primary/10 group-hover:bg-text-primary/20 transition-colors">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-semibold text-sm md:text-lg">{benefit.title}</h3>
                                </div>
                                <p className="text-text-primary/60 text-xs  md:text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jobs Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                            Open Positions
                        </h2>
                        <p className="text-text-primary/60">
                            Browse our current opportunities
                        </p>
                    </div>

                    <div className="space-y-8">
                        {jobs.map((job) => (
                            <JobCard key={job.id} {...job} />
                        ))}
                    </div>

                    {/* No Open Positions Message */}
                    {openPositions === 0 && (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="w-16 h-16 mx-auto rounded-full border border-text-primary/10 bg-text-primary/5 flex items-center justify-center">
                                    <Briefcase className="w-8 h-8 text-text-primary/40" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        No Open Positions
                                    </h3>
                                    <p className="text-text-primary/60">
                                        All positions are currently filled. Check back soon for new opportunities!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-text-primary/10 bg-text-primary/5 p-8 sm:p-12 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                            Don't See Your Role?
                        </h2>
                        <p className="text-sm text-text-primary/60 mb-8 max-w-2xl mx-auto">
                            We're always looking for talented individuals. Send us your resume and tell us how you can contribute.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href={`mailto:${jobs[0].email}?subject=Spontaneous Application`}
                                className="text-sm inline-flex items-center gap-2 px-3 py-1 md:px-6 md:py-3 rounded-full bg-text-primary text-background font-medium hover:opacity-90 transition-opacity"
                            >
                                Send Your Resume
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <p className="text-sm text-text-primary/60">
                                Email: {jobs[0].email}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ---------------- JOB CARD ---------------- */

function JobCard({
    title,
    workType,
    employmentType,
    experience,
    publishedAt,
    status,
    email,
    description,
    responsibilities,
    skills,
    perks,
}: any) {
    const isOpen = status === "Open";

    return (
        <div className="group relative">
            {/* Status Indicator */}
            <div className={`absolute top-0 left-0 h-full w-1.5 rounded-l-lg ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />

            <div className="ml-4 rounded-2xl border border-text-primary/10 bg-text-primary/5 p-6 md:p-8 space-y-8 hover:bg-text-primary/10 transition-all duration-300">
                {/* Header */}
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold group-hover:text-text-primary transition-colors">
                                    {title}
                                </h2>

                                {/* Status Badge - Mobile First */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${isOpen
                                    ? 'border-green-500/30 bg-green-500/10 text-green-700'
                                    : 'border-red-500/30 bg-red-500/10 text-red-700'
                                    }`}>
                                    {isOpen ? (
                                        <>
                                            <CheckCircle className="w-3 h-3" />
                                            Open Position
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-3 h-3" />
                                            Position Closed
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2 text-sm text-text-primary/60">
                                    <Briefcase className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{employmentType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-primary/60">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{workType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-primary/60">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    <span>{experience}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-primary/60">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>Published: {publishedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-text-primary/70 text-base leading-relaxed">
                    {description}
                </p>

                {/* Responsibilities */}
                {responsibilities && responsibilities.length > 0 && (
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="p-1.5 rounded-md bg-text-primary/10">
                                <Briefcase className="w-4 h-4" />
                            </span>
                            Key Responsibilities
                        </h3>
                        <ul className="space-y-3 pl-4">
                            {responsibilities.map((item: string) => (
                                <li key={item} className="flex items-start gap-3 text-text-primary/60 text-sm md:text-base">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-text-primary/40 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Skills & Perks Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Requirements */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="p-1.5 rounded-md bg-text-primary/10">
                                <Star className="w-4 h-4" />
                            </span>
                            Requirements
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill: string) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 rounded-full border border-text-primary/10 bg-text-primary/5 text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Perks */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="p-1.5 rounded-md bg-text-primary/10">
                                <CheckCircle className="w-4 h-4" />
                            </span>
                            Why Join Us?
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {perks.map((perk: string) => (
                                <span
                                    key={perk}
                                    className="px-3 py-1.5 rounded-full border border-text-primary/10 bg-text-primary/5 text-sm"
                                >
                                    {perk}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer - Apply Info */}
                <div className="pt-6 border-t border-text-primary/10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3 text-text-primary/60 text-sm">
                            <div className="p-2 rounded-lg bg-text-primary/5">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="font-medium">Apply via email</div>
                                <div className="text-text-primary font-medium">{email}</div>
                            </div>
                        </div>

                        {isOpen && (
                            <a
                                href={`mailto:${email}?subject=Application: ${title}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-text-primary/20 bg-text-primary/5 hover:bg-text-primary hover:text-background transition-all duration-300 font-medium text-sm sm:text-base group/apply"
                            >
                                Apply Now
                                <ArrowRight className="w-4 h-4 group-hover/apply:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}