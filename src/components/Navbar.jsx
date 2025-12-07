// components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Synonyms', path: 'vocab-master/synonyms' },
        { name: 'Antonyms', path: 'vocab-master/antonyms' },
        { name: 'One-Word Substitution', path: 'vocab-master/one-word-substitution' },
        { name: 'Vocabulary', path: 'vocab-master/vocabulary' },
        { name: 'Idioms & Phrases', path: 'vocab-master/idioms-phrases' },
        { name: 'Country Capital', path: 'vocab-master/country-capital' },
        { name: 'About', path: 'vocab-master/about' },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/vocab-master';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/vocab-master/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-blue-400" />
                        <span className="text-xl font-bold text-white">VocabMaster</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(item.path)
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive(item.path)
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
