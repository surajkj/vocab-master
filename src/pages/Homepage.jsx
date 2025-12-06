// pages/Homepage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Target,
    Users,
    Award,
    TrendingUp,
    ChevronRight,
    CheckCircle,
    Star,
    Zap,
    Shield,
    Globe,
    BarChart,
    Clock,
    Sparkles,
    MessageSquare,
    FileText,
    Search,
    Contrast
} from 'lucide-react';

const Homepage = () => {
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const features = [
        {
            id: 'synonyms',
            icon: <Search className="h-8 w-8" />,
            title: 'Synonyms Quiz',
            description: 'Expand your vocabulary by finding words with similar meanings',
            color: 'blue',
            path: '/synonyms',
            stats: '500+ words',
            difficulty: 'Beginner to Advanced'
        },
        {
            id: 'antonyms',
            icon: <Contrast className="h-8 w-8" />,
            title: 'Antonyms Practice',
            description: 'Master words with opposite meanings to enhance comprehension',
            color: 'red',
            path: '/antonyms',
            stats: '400+ pairs',
            difficulty: 'Intermediate'
        },
        {
            id: 'one-word',
            icon: <FileText className="h-8 w-8" />,
            title: 'One-Word Substitution',
            description: 'Replace lengthy phrases with single, precise words',
            color: 'purple',
            path: '/one-word-substitution',
            stats: '300+ phrases',
            difficulty: 'Advanced'
        },
        {
            id: 'vocabulary',
            icon: <BookOpen className="h-8 w-8" />,
            title: 'Vocabulary Builder',
            description: 'Learn new words daily with meanings and usage examples',
            color: 'green',
            path: '/vocabulary',
            stats: '1000+ words',
            difficulty: 'All Levels'
        },
        {
            id: 'idioms',
            icon: <MessageSquare className="h-8 w-8" />,
            title: 'Idioms & Phrases',
            description: 'Understand and use common English idioms in context',
            color: 'yellow',
            path: '/idioms-phrases',
            stats: '200+ idioms',
            difficulty: 'Intermediate'
        }
    ];

    const stats = [
        { value: '5000+', label: 'Active Students', icon: <Users className="h-6 w-6" /> },
        { value: '2000+', label: 'Questions', icon: <Target className="h-6 w-6" /> },
        { value: '98%', label: 'Satisfaction Rate', icon: <Award className="h-6 w-6" /> },
        { value: '24/7', label: 'Available', icon: <Clock className="h-6 w-6" /> }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'IELTS Student',
            content: 'This platform helped me improve my vocabulary score from 6.5 to 8.0 in just 2 months!',
            avatar: 'SJ'
        },
        {
            name: 'Raj Patel',
            role: 'Competitive Exam Aspirant',
            content: 'The synonym and antonym exercises are exactly what I needed for my government exam preparation.',
            avatar: 'RP'
        },
        {
            name: 'Maria Garcia',
            role: 'ESL Teacher',
            content: 'I recommend this to all my students. The interface is clean and the content is well-organized.',
            avatar: 'MG'
        }
    ];

    const learningPaths = [
        {
            level: 'Beginner',
            description: 'Start with basic vocabulary and common synonyms',
            duration: '4 weeks',
            progress: 'Start Now',
            color: 'from-blue-500 to-blue-600'
        },
        {
            level: 'Intermediate',
            description: 'Master idioms, antonyms, and advanced vocabulary',
            duration: '6 weeks',
            progress: 'Continue Learning',
            color: 'from-purple-500 to-purple-600'
        },
        {
            level: 'Advanced',
            description: 'Excel in competitive exams with one-word substitution',
            duration: '8 weeks',
            progress: 'Challenge Yourself',
            color: 'from-red-500 to-red-600'
        }
    ];

    const colorClasses = {
        blue: {
            bg: 'bg-blue-500',
            hover: 'hover:bg-blue-600',
            light: 'bg-blue-500/10',
            text: 'text-blue-400',
            border: 'border-blue-500'
        },
        red: {
            bg: 'bg-red-500',
            hover: 'hover:bg-red-600',
            light: 'bg-red-500/10',
            text: 'text-red-400',
            border: 'border-red-500'
        },
        purple: {
            bg: 'bg-purple-500',
            hover: 'hover:bg-purple-600',
            light: 'bg-purple-500/10',
            text: 'text-purple-400',
            border: 'border-purple-500'
        },
        green: {
            bg: 'bg-green-500',
            hover: 'hover:bg-green-600',
            light: 'bg-green-500/10',
            text: 'text-green-400',
            border: 'border-green-500'
        },
        yellow: {
            bg: 'bg-yellow-500',
            hover: 'hover:bg-yellow-600',
            light: 'bg-yellow-500/10',
            text: 'text-yellow-400',
            border: 'border-yellow-500'
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-32">
                <div className="absolute inset-0"></div>

    <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Trusted by 5000+ students worldwide</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Master English
              </span>
                <br />
                <span className="text-white">With Interactive Practice</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Elevate your English skills through engaging exercises in synonyms, antonyms,
                vocabulary, and more. Perfect for students, professionals, and competitive exam aspirants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    to="/synonyms"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                >
                    Start Learning Free
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
                >
                    Learn More
                </Link>
            </div>
        </div>
    </div>
</section>

    {/* Stats Section */}
    <section className="py-12 relative -mt-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-700/50 rounded-lg">
                                <div className="text-blue-400">
                                    {stat.icon}
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Comprehensive English Practice</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Five specialized modules designed to improve every aspect of your English vocabulary
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {features.map((feature) => {
                    const colors = colorClasses[feature.color];

                    return (
                        <Link
                            key={feature.id}
                            to={feature.path}
                            className="group"
                            onMouseEnter={() => setHoveredFeature(feature.id)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <div className={`h-full bg-gray-800 rounded-xl p-8 border-2 ${
                                hoveredFeature === feature.id
                                    ? `${colors.border} border-opacity-100`
                                    : 'border-gray-700'
                            } transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-lg ${colors.light}`}>
                                        <div className={colors.text}>
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        colors.light
                                    } ${colors.text}`}>
                                        {feature.difficulty}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 mb-6">{feature.description}</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{feature.stats}</span>
                                    <div className={`p-2 rounded-full ${
                                        colors.bg
                                    } ${colors.hover} transition-colors group-hover:scale-110`}>
                                        <ChevronRight className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Learning Paths */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-2">Personalized Learning Paths</h3>
                        <p className="text-gray-400">Follow structured paths based on your skill level</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-400" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {learningPaths.map((path, index) => (
                        <div key={index} className={`bg-gradient-to-br ${path.color} rounded-xl p-6`}>
                            <div className="text-white">
                                <div className="text-sm font-semibold mb-2">LEVEL {index + 1}</div>
                                <h4 className="text-2xl font-bold mb-3">{path.level}</h4>
                                <p className="text-white/80 mb-6">{path.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">{path.duration}</span>
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold">
                        {path.progress}
                      </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">What Students Say</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Join thousands of successful students who improved their English skills
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{testimonial.name}</h4>
                                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-300 italic">"{testimonial.content}"</p>
                        <div className="flex mt-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* Benefits Section */}
    <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Why Choose EnglishMaster?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8">
                        Our platform is designed with modern learning principles to ensure
                        maximum retention and engagement.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                icon: <Target className="h-6 w-6" />,
                                title: 'Personalized Learning',
                                description: 'Adaptive exercises based on your progress and performance'
                            },
                            {
                                icon: <BarChart className="h-6 w-6" />,
                                title: 'Progress Tracking',
                                description: 'Detailed analytics to monitor your improvement'
                            },
                            {
                                icon: <Shield className="h-6 w-6" />,
                                title: 'Ad-Free Experience',
                                description: 'Focus on learning without distractions'
                            },
                            {
                                icon: <Globe className="h-6 w-6" />,
                                title: 'Accessible Anywhere',
                                description: 'Learn on any device, anytime'
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg">
                                    <div className="text-blue-400">{benefit.icon}</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        {benefit.title}
                                    </h4>
                                    <p className="text-gray-400">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                    <div className="text-center mb-8">
                        <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Start Learning Today</h3>
                        <p className="text-gray-400">Join our community of learners</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            'Free access to all exercises',
                            'Daily practice challenges',
                            'Progress reports',
                            'Certificate of completion',
                            'Community support'
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/synonyms"
                        className="mt-8 block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-center hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.02]"
                    >
                        Get Started For Free
                    </Link>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        No credit card required • 100% free forever
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900/20 to-gray-900">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Master English?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Join thousands of students who transformed their English skills
                    with our interactive platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/synonyms"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105"
                    >
                        Start Free Practice
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-gray-800 transition-all border border-gray-700"
                    >
                        Learn About Us
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['IELTS', 'TOEFL', 'GRE', 'SAT'].map((exam) => (
                        <div key={exam} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div className="text-white font-semibold">{exam}</div>
                            <div className="text-sm text-gray-400">Preparation</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3 mb-6 md:mb-0">
                    <BookOpen className="h-8 w-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">EnglishMaster</span>
                </div>

                <div className="text-gray-400 text-center md:text-right">
                    <p className="mb-2">© {new Date().getFullYear()} EnglishMaster. All rights reserved.</p>
                    <p>Designed for students worldwide 🌍</p>
                </div>
            </div>
        </div>
    </footer>
</div>
);
};

export default Homepage;