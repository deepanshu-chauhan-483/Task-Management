"use client";

import Link from "next/link";
import { useAuth } from "../app/context/AuthContext";
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Stay Organized,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Get Things Done
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Simple, powerful task management to help you focus on what matters. Create, organize, and track your tasks effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg transition-colors hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Visual Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-lg">
          <div className="aspect-video bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-xl border border-slate-300 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Your tasks dashboard will appear here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-slate-200 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Features You'll Love
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to manage tasks effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Create & Organize
              </h3>
              <p className="text-slate-600">
                Quickly add tasks and stay organized with an intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Instant Updates
              </h3>
              <p className="text-slate-600">
                Real-time synchronization keeps all your tasks up to date
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-slate-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Track Progress
              </h3>
              <p className="text-slate-600">
                See your completion rates and stay motivated
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Smart Filtering
              </h3>
              <p className="text-slate-600">
                Filter by status and search to find tasks instantly
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-br from-white to-slate-50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Fast & Responsive
              </h3>
              <p className="text-slate-600">
                Lightning-fast performance on all your devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of productive users managing their tasks with TaskApp
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Start Your Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>&copy; 2024 TaskApp. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
