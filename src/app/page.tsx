'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Calendar,
  Activity,
  BarChart3,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Heart,
  TrendingUp,
  Clock,
  Star,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
}

const blobAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 90, 0],
  borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
}

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Care Worker Management',
      description: 'Efficiently manage your care team with profiles, certifications, and performance tracking.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Intelligent scheduling system that optimizes routes and matches workers with clients.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Activity,
      title: 'Real-time Tracking',
      description: 'Track visits in real-time with GPS check-ins and instant status updates.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Comprehensive reporting and analytics to help you make data-driven decisions.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Built-in compliance tools to meet regulatory requirements and maintain high standards.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Beautiful, responsive interface that works seamlessly on any device.',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Care Workers' },
    { value: '50K+', label: 'Clients' },
    { value: '1M+', label: 'Visits' },
    { value: '4.9/5', label: 'Rating' }
  ]

  const roles = [
    {
      title: 'Administrator',
      icon: Shield,
      gradient: 'from-blue-500 via-blue-600 to-purple-600',
      features: [
        'Team Management',
        'Analytics Dashboard',
        'Compliance Tools',
        'Billing & Invoicing'
      ]
    },
    {
      title: 'Supervisor',
      icon: Users,
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      features: [
        'Team Oversight',
        'Care Log Review',
        'Incident Management',
        'Performance Reports'
      ]
    },
    {
      title: 'Care Worker',
      icon: Heart,
      gradient: 'from-green-500 via-emerald-600 to-teal-600',
      features: [
        'Daily Schedule',
        'Care Log Entry',
        'Client Profiles',
        'GPS Navigation'
      ]
    },
    {
      title: 'Client',
      icon: UserCheck,
      gradient: 'from-orange-500 via-amber-600 to-yellow-600',
      features: [
        'View Care Schedule',
        'Care Worker Profiles',
        'Service History',
        'Direct Messaging'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={blobAnimation}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-3xl"
          />
          <motion.div
            animate={blobAnimation}
            style={{ animationDelay: '3s' }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-500 opacity-20 blur-3xl"
          />
          <motion.div
            animate={blobAnimation}
            style={{ animationDelay: '6s' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 opacity-10 blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Modern Care Management
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Streamline your care operations with intelligent scheduling, real-time tracking,
            and comprehensive management tools designed for modern care providers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
              asChild
            >
              <Link href="/login">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            >
              Book a Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Illustration Placeholder */}
          <motion.div
            variants={itemVariants}
            className="mt-20 relative"
          >
            <div className="relative max-w-5xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Dashboard Preview</p>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="font-semibold text-gray-900">98% On-time Rate</span>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">4.9/5 Rating</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you manage care operations efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Role-Based Login Cards */}
      <section className="py-20 bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600">
              Tailored experiences for every user type
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div className={`h-32 bg-gradient-to-br ${role.gradient} relative overflow-hidden`}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"
                    />
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <role.icon className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {role.title}
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full bg-gradient-to-r ${role.gradient} text-white hover:shadow-lg transition-all`}
                      size="lg"
                      asChild
                    >
                      <Link href="/login">
                        Access Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your Care Operations?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-white/90 mb-10"
          >
            Join thousands of care providers who trust our platform to deliver exceptional care.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
              asChild
            >
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6"
            >
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Care Platform</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Care Platform. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
