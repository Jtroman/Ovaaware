"use client";

import React, { useState } from 'react';
import { Shield, BarChart2, Clipboard, ChevronRight, Award, Check, ArrowRight, MessageCircle, Info, MapPin, Lock, Heart, AlertTriangle, Star, Users, Calendar, Activity, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const OvaAwareLandingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [riskLevel, setRiskLevel] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  return (
    <div className="font-sans antialiased">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">New Study:</span> Early assessment reduces ovarian cancer risk by up to 30% - <a href="/resources" className="underline font-bold hover:text-purple-200 transition-colors">Learn More</a>
      </div>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 h-8 w-8 rounded-full flex items-center justify-center mr-2 shadow-md">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-teal-700">OvaAware</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-teal-700 transition-colors duration-200">Home</a>
          <a href="/assessment" className="text-gray-600 hover:text-teal-700 transition-colors duration-200">Assessment</a>
          <a href="/resources" className="text-gray-600 hover:text-teal-700 transition-colors duration-200">Risk Factors</a>
          <a href="/resources" className="text-gray-600 hover:text-teal-700 transition-colors duration-200">Resources</a>
          <a href="/testimonials" className="text-gray-600 hover:text-teal-700 transition-colors duration-200">Success Stories</a>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => router.push('/me')} 
            className="px-4 py-2 text-gray-600 hover:text-teal-700 transition-colors duration-200"
          >
            Login
          </button>
          <button 
            onClick={() => router.push('/assessment')} 
            className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            Start Assessment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 px-6 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-gray-600 hover:text-teal-700 transition-colors duration-200 py-2">Home</a>
                <a href="/assessment" className="text-gray-600 hover:text-teal-700 transition-colors duration-200 py-2">Assessment</a>
                <a href="/resources" className="text-gray-600 hover:text-teal-700 transition-colors duration-200 py-2">Risk Factors</a>
                <a href="/resources" className="text-gray-600 hover:text-teal-700 transition-colors duration-200 py-2">Resources</a>
                <a href="/testimonials" className="text-gray-600 hover:text-teal-700 transition-colors duration-200 py-2">Success Stories</a>
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => router.push('/me')} 
                    className="w-full py-2 text-gray-600 hover:text-teal-700 transition-colors duration-200 mb-2"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => router.push('/assessment')} 
                    className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-md"
                  >
                    Start Assessment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 pt-16 pb-24 bg-gradient-to-br from-white to-teal-50/70 overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-gradient-to-br from-teal-100 to-teal-200"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 -mb-32 -ml-16 w-96 h-96 rounded-full bg-gradient-to-br from-purple-100 to-purple-200"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-coral-100 to-coral-200"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full border-4 border-teal-200"
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4 px-4 py-1.5 bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 rounded-full text-sm font-medium shadow-sm"
              >
                97% of women recommend OvaAware to friends
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
              >
                Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500">Ovarian Cancer Risk</span> in 5 Minutes
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed"
              >
                Empowering you with personalized insights into ovarian cancer risk. 
                Understand your factors and take proactive steps towards your health.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => router.push('/assessment')}
                  className="group px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02]"
                >
                  Take the assessment now
                  <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8 flex items-center"
              >
                <div className="flex -space-x-2">
                  <img src="https://placehold.co/32x32.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://placehold.co/32x32.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <img src="https://placehold.co/32x32.png" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                </div>
                <p className="ml-3 text-sm text-gray-600">Joined by <span className="font-medium">27,392</span> women this month</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-4 flex items-center"
              >
                <Lock className="h-4 w-4 text-teal-700 mr-2" />
                <p className="text-sm text-gray-500">Your data is secure and protected by HIPAA compliance</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="relative mx-auto max-w-md">
                {/* Main image with decorative frame */}
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-teal-100 to-teal-50 p-3 rounded-2xl shadow-xl"
                >
                  <img 
                    src="https://placehold.co/500x400.png" 
                    alt="Woman feeling empowered about her health" 
                    className="rounded-xl shadow-lg object-cover w-full"
                  />
                  
                  {/* Mini feature cards */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl"
                  >
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-teal-100 to-teal-50 p-3 rounded-full">
                        <Check className="h-6 w-6 text-teal-700" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">5-minute assessment</p>
                        <p className="text-sm text-gray-500">Quick, private, and informative</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-xl"
                  >
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-purple-700" />
                      </div>
                      <div className="ml-2">
                        <p className="font-medium text-gray-800 text-sm">MD Approved</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 3 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute top-3/4 -right-4 bg-gradient-to-br from-coral-50 to-coral-100 p-2 rounded-lg shadow-xl"
                  >
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                      <span className="ml-1 text-xs font-medium">4.9/5</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Risk Demo Section */}
      <section className="px-6 lg:px-16 py-24 bg-white border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">See How Risk Assessment Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Try our interactive demo to understand how different factors affect ovarian cancer risk
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid md:grid-cols-5">
              {/* Interactive Controls */}
              <div className="p-8 md:col-span-2 bg-gradient-to-br from-teal-700 to-teal-800 text-white">
                <h3 className="text-xl font-bold mb-8">Adjust Risk Factors</h3>
                
                <div className="space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="flex justify-between text-sm mb-3">
                      <span>Age</span>
                      <span className="font-medium">{30 + (riskLevel * 5)} years</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={riskLevel} 
                      onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <label className="text-sm font-medium">Family History</label>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-2.5 px-4 rounded-lg border border-teal-500 transition-all duration-200 ${activeTab === 0 ? 'bg-teal-500 text-white shadow-lg' : 'bg-transparent text-white hover:bg-teal-600/20'}`}
                        onClick={() => setActiveTab(0)}
                      >
                        None
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-2.5 px-4 rounded-lg border border-teal-500 transition-all duration-200 ${activeTab === 1 ? 'bg-teal-500 text-white shadow-lg' : 'bg-transparent text-white hover:bg-teal-600/20'}`}
                        onClick={() => setActiveTab(1)}
                      >
                        First Degree
                      </motion.button>
                    </div>
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-sm font-medium mb-3 block">Pregnancies</label>
                      <div className="grid grid-cols-3 gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-teal-500 text-white rounded-lg text-sm shadow-lg"
                        >
                          0
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-transparent border border-teal-500 text-white rounded-lg text-sm hover:bg-teal-600/20"
                        >
                          1+
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-transparent border border-teal-500 text-white rounded-lg text-sm hover:bg-teal-600/20"
                        >
                          3+
                        </motion.button>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-sm font-medium mb-3 block">Birth Control Use</label>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-transparent border border-teal-500 text-white rounded-lg text-sm hover:bg-teal-600/20"
                        >
                          Yes
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2.5 bg-teal-500 text-white rounded-lg text-sm shadow-lg"
                        >
                          No
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#ffffff' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-white text-teal-800 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Calculate Sample Risk
                  </motion.button>
                </div>
              </div>
              
              {/* Results Visualization */}
              <div className="p-8 md:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-gray-800">Your Sample Risk Profile</h3>
                  <span className="text-xs px-3 py-1.5 bg-teal-100 text-teal-800 rounded-full font-medium">Demo Only</span>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 mb-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">Risk Level</h4>
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${activeTab === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {activeTab === 0 ? 'Average' : 'Moderate'}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Risk Visualization */}
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${20 + (riskLevel * (activeTab === 0 ? 5 : 8))}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-full ${activeTab === 0 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'}`}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Low Risk</span>
                    <span>Average Risk</span>
                    <span>High Risk</span>
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start"
                  >
                    <div className={`p-2.5 rounded-full ${activeTab === 0 ? 'bg-green-100' : 'bg-yellow-100'} mr-4`}>
                      <AlertTriangle className={`h-5 w-5 ${activeTab === 0 ? 'text-green-700' : 'text-yellow-700'}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Key Insight</h4>
                      <p className="text-sm text-gray-600">
                        {activeTab === 0 
                          ? `Your age (${30 + (riskLevel * 5)}) and lack of family history suggest an average risk profile. Regular check-ups are still recommended.` 
                          : `Having a first-degree relative with ovarian cancer increases your baseline risk. Consider enhanced screening options.`}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start"
                  >
                    <div className="p-2.5 rounded-full bg-teal-100 mr-4">
                      <Clipboard className="h-5 w-5 text-teal-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Recommended Action</h4>
                      <p className="text-sm text-gray-600">
                        {activeTab === 0 
                          ? 'Annual wellness exams and being aware of changes in your body are appropriate steps.' 
                          : 'Consider genetic counseling to understand your inherited risk factors better.'}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8 text-center">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/assessment')}
                    className="inline-flex items-center text-teal-700 font-medium hover:text-teal-800 group"
                  >
                    Take the full assessment for personalized results
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">Why Choose OvaAware</span>
            <h2 className="font-serif text-3xl font-bold text-gray-800">Your Journey to Informed Health Decisions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach provides you with the tools and knowledge needed to understand your personal risk profile.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-teal-200 group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Personalized Assessment</h3>
              <p className="text-gray-600">
                Receive a risk score based on your unique profile, utilizing established models for a comprehensive understanding of your personal risk factors.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Clinically validated risk models</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Family history analysis</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Lifestyle factor evaluation</span>
                </li>
              </ul>
              <a 
                onClick={() => router.push('/resources')} 
                className="inline-flex items-center mt-6 text-teal-700 font-medium hover:text-teal-800 group-hover:underline cursor-pointer"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-teal-200 group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Clear Visual Insights</h3>
              <p className="text-gray-600">
                Understand the key factors influencing your risk with intuitive visualizations and detailed explanations designed for clarity.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Interactive risk dashboards</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Factor-by-factor breakdown</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Comparative analysis</span>
                </li>
              </ul>
              <a 
                onClick={() => router.push('/resources')} 
                className="inline-flex items-center mt-6 text-teal-700 font-medium hover:text-teal-800 group-hover:underline cursor-pointer"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-teal-200 group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clipboard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Actionable Next Steps</h3>
              <p className="text-gray-600">
                Get tailored recommendations and guidance on potential next steps you can discuss with your healthcare provider.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Personalized screening schedules</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Lifestyle modification guidance</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-teal-700 mr-2 flex-shrink-0" />
                  <span>Provider discussion guides</span>
                </li>
              </ul>
              <a 
                onClick={() => router.push('/resources')} 
                className="inline-flex items-center mt-6 text-teal-700 font-medium hover:text-teal-800 group-hover:underline cursor-pointer"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-16 py-24 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">Simple Process</span>
            <h2 className="font-serif text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process gives you valuable insights in just minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-full hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white font-bold">1</div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and create your secure account in less than a minute with easy social login options.
                </p>
                <div className="mt-4 flex space-x-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">30 seconds</span>
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs">Free</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-teal-700" />
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-full hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white font-bold">2</div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Complete Assessment</h3>
                <p className="text-gray-600">
                  Answer our clinically-validated questions about your health history and lifestyle factors.
                </p>
                <div className="mt-4 flex space-x-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">5 minutes</span>
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs">User-friendly</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-teal-700" />
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-full hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white font-bold">3</div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Review Your Results</h3>
                <p className="text-gray-600">
                  Get immediate access to your personalized risk assessment with visual explanations.
                </p>
                <div className="mt-4 flex space-x-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Instant</span>
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs">Visual</span>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-teal-700" />
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-full hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white font-bold">4</div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Take Action</h3>
                <p className="text-gray-600">
                  Receive personalized recommendations and discuss next steps with your doctor using our provider guide.
                </p>
                <div className="mt-4 flex space-x-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Actionable</span>
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs">Download</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center mx-auto transform hover:translate-y-[-2px]">
              Start Your Free Assessment
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Join over 100,000 women who have already taken control of their health
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Endorsement Section */}
      <section className="px-6 lg:px-16 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-teal-800 to-teal-900 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 relative">
                <img 
                  src="https://placehold.co/400x500.png" 
                  alt="Dr. Sarah Johnson, MD" 
                  className="h-full w-full object-cover"
                  data-ai-hint="doctor professional"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">Dr. Sarah Johnson, MD</h3>
                  <p className="text-teal-200 text-sm">Chief Medical Advisor</p>
                  <p className="text-teal-200 text-sm mt-1">Johns Hopkins Hospital</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex mb-6">
                  <svg className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v4.577a1.001 1.001 0 0 0 .992.991l8.53-.035a1 1 0 0 1 .988.8l.007.048a6.416 6.416 0 0 1-1.394 4.936l-.017.02a6.369 6.369 0 0 1-4.8 2.351h-.05a6.419 6.419 0 0 1-3.99-1.373l-.05-.039a" />
                  </svg>
                  {/* Remaining SVG path was truncated, assuming it's a quote icon */}
                </div>
                {/* Content of endorsement was truncated */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OvaAwareLandingPage;
