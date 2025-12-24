import { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  CpuChipIcon,
  DocumentCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BoltIcon,
  EyeIcon,
  KeyIcon,
  CloudArrowDownIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

/* 🔹 Updated Theme Palette to match the pastel purple/blue design */
const CYBER_THEME = {
  primary: "from-indigo-300 to-blue-400",
  secondary: "from-purple-300 to-pink-400",
  success: "from-green-300 to-emerald-400",
  warning: "from-amber-300 to-orange-400",
  critical: "from-rose-300 to-red-400",
  dark: "bg-slate-900/70 backdrop-blur-xl", // Slightly lighter for softer feel
  card: "bg-white/5 backdrop-blur-lg border border-white/20", // Lighter card background
  glow: "shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]", // Softer glow
};

/* 🔹 Section content components */
const DashboardSection = ({ data, onRiskClick, aiReasoning, isThinking,
  onApprove, onReject, onSimulate, simulationResult }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {data.stats.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5 }}
          className={`${CYBER_THEME.card} ${CYBER_THEME.glow} rounded-2xl p-6 transition-all duration-300 overflow-hidden relative`}
        >
          <div className="absolute inset-0 bg-linear-to-r opacity-5
            from-indigo-300 to-blue-300 animate-pulse-slow" />
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-200 font-medium text-sm flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </p>
                <p className="text-3xl font-bold mt-1 bg-clip-text text-transparent bg-linear-to-r from-indigo-200 to-blue-100">
                  {item.value}
                </p>
                {item.id === 'compliance' && (
                  <p className="text-green-300 text-sm mt-1 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Above industry benchmark
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-xl bg-linear-to-br ${item.glow} text-white`}>
                {item.icon}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Resource Heatmap */}
      <div className="lg:col-span-2">
        <ResourceHeatmap resources={data.resources} onRiskClick={onRiskClick} />
      </div>
      {/* AI Recommendation Panel */}
      <div>
        <AIRecommendationPanel
          recommendation={data.recommendation}
          aiReasoning={aiReasoning}
          isThinking={isThinking}
          onApprove={onApprove}
          onReject={onReject}
          onSimulate={onSimulate}
          simulationResult={simulationResult}
        />
      </div>
    </div>
  </motion.div>
);

const AlertsSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Critical Alerts */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-rose-400">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
            Critical Security Alerts
          </h2>
          <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm font-medium">
            5 Active
          </span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className={`border-l-4 border-rose-500 p-4 mb-4 ${CYBER_THEME.card} hover:border-rose-400 transition-colors`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-rose-300">Unauthorized Access Attempt</h3>
                <p className="text-gray-300 mt-1">Resource: PatientRecords-DB</p>
                <p className="text-xs text-gray-400 mt-1">Detected 12 minutes ago • Source: 45.128.xx.xx</p>
              </div>
              <div className="bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-sm font-medium">
                CRITICAL
              </div>
            </div>
            <div className="mt-3 flex space-x-3">
              <button className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded hover:bg-blue-500/30 transition">
                Investigate
              </button>
              <button className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded hover:bg-green-500/30 transition">
                Auto-Remediate
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Threat Intelligence */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-blue-400">
            <BoltIcon className="h-6 w-6 mr-2" />
            Threat Intelligence
          </h2>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
            Real-time
          </span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-blue-500/20 rounded-lg hover:border-blue-400 transition">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                <p className="text-gray-300">
                  <span className="text-blue-300 font-medium">Active Campaign:</span> Healthcare credential stuffing targeting US clinics
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">CVE-2025-2871</span>
                <span className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs">Credential Stuffing</span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">Healthcare Sector</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Alert Timeline */}
    <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
      <h2 className="text-xl font-bold mb-5 flex items-center text-purple-400">
        <ChartBarIcon className="h-6 w-6 mr-2" />
        Alert Timeline & Response
      </h2>
      <div className="relative pl-6 border-l border-purple-500/30">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mb-6 relative">
            <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center border-2 border-purple-400">
              <span className="text-white font-bold text-xs">{i}</span>
            </div>
            <div className="ml-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-purple-300">Anomaly Detected in Authentication Flow</h3>
                  <p className="text-gray-300 mt-1">AI detected unusual access patterns from new geographic region</p>
                </div>
                <span className="text-xs text-purple-400">Today, 14:28</span>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded hover:bg-purple-500/30 transition">
                  View Details
                </button>
                <button className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded hover:bg-blue-500/30 transition">
                  AI Analysis
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const RemediationSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Auto-Remediation Engine */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-emerald-400">
            <ArrowPathIcon className="h-6 w-6 mr-2" />
            Auto-Remediation Engine
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-300 text-sm">Active</span>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${CYBER_THEME.card} border border-emerald-500/20 rounded-xl p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
                      <KeyIcon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-300">Public Database Exposure</h3>
                      <p className="text-gray-300 mt-1">PatientRecords-DB</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded text-xs">AUTO-FIX</span>
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">Zero Downtime</span>
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs">HIPAA Critical</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-lg">98%</span>
                  <p className="text-xs text-gray-400">Confidence</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded hover:bg-blue-500/30 transition flex items-center">
                  <PlayIcon className="h-3 w-3 mr-1" /> Simulate
                </button>
                <button className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded hover:bg-emerald-500/30 transition flex items-center">
                  <CheckCircleIcon className="h-3 w-3 mr-1" /> Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Remediation Library */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-amber-400">
            <BeakerIcon className="h-6 w-6 mr-2" />
            Remediation Library
          </h2>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium">
            42 Templates
          </span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-slate-800/20 border border-amber-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-linear-to-r from-amber-500 to-amber-600 p-2 rounded-lg mr-3">
                  <CpuChipIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-amber-300">Firewall Rule Optimization</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">Automatically restricts overly permissive network security groups to least privilege access</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs">Azure Firewall</span>
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-xs">Compliance: NIST 800-53</span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">Success Rate: 97%</span>
              </div>
              <div className="flex justify-end">
                <button className="text-xs bg-linear-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded hover:opacity-90 transition">
                  Apply Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Deployment Pipeline */}
    <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
      <h2 className="text-xl font-bold mb-5 flex items-center text-blue-400">
        <CloudArrowDownIcon className="h-6 w-6 mr-2" />
        Secure Deployment Pipeline
      </h2>
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          {['Detection', 'Analysis', 'Approval', 'Deployment', 'Verification'].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${
                index <= 2 ? 'border-blue-400 bg-blue-500/20' : 'border-gray-500 bg-gray-700/30'
              }`}>
                <span className={`font-bold ${
                  index <= 2 ? 'text-blue-300' : 'text-gray-400'
                }`}>{index + 1}</span>
              </div>
              <span className={`text-sm ${
                index <= 2 ? 'text-blue-300 font-medium' : 'text-gray-400'
              }`}>{step}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-500 to-cyan-400 w-3/5 animate-pulse-slow"></div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${CYBER_THEME.card} p-4 rounded-xl border border-blue-500/30`}>
            <div className="flex items-start">
              <div className="mt-1 mr-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-blue-300">Deployment #{i} - PatientRecords-DB Fix</h3>
                <p className="text-gray-300 text-sm mt-1">Status: <span className="text-emerald-400">Successfully deployed</span></p>
                <p className="text-xs text-gray-400 mt-1">Completed 2 hours ago • Zero downtime</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const AuditSection = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Compliance Dashboard */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-purple-400">
            <DocumentCheckIcon className="h-6 w-6 mr-2" />
            Compliance Dashboard
          </h2>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
            HIPAA • NIST • SOC2
          </span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-slate-800/20 border border-purple-500/20 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-purple-300">HIPAA Compliance Score</h3>
                  <p className="text-gray-300 mt-1">Security controls for patient data protection</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-300 to-pink-300">
                    94%
                  </span>
                  <p className="text-xs text-gray-400">+2% this week</p>
                </div>
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-purple-500 to-pink-500 w-11/12 animate-pulse-slow"></div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-300 rounded text-xs">Access Controls: 98%</span>
                <span className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs">Encryption: 91%</span>
                <span className="px-2 py-1 bg-violet-500/10 text-violet-300 rounded text-xs">Audit Trails: 100%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Audit Trail */}
      <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold flex items-center text-teal-400">
            <EyeIcon className="h-6 w-6 mr-2" />
            System Audit Trail
          </h2>
          <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors flex items-center">
            Export Logs
            <CloudArrowDownIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-3 border border-teal-500/20 rounded-lg hover:border-teal-400 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-teal-300">Security Policy Update</h3>
                  <p className="text-gray-300 mt-1">Modified firewall rules for PatientRecords-DB</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">Today, 14:{(30 + i).toString().padStart(2, '0')}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-teal-500/10 text-teal-300 rounded text-xs">User: admin@clinic.org</span>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded text-xs">Action: APPROVED</span>
                <span className="px-2 py-1 bg-violet-500/10 text-violet-300 rounded text-xs">Confidence: 98%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Audit Visualization */}
    <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
      <h2 className="text-xl font-bold mb-5 flex items-center text-indigo-400">
        <ChartBarIcon className="h-6 w-6 mr-2" />
        Security Posture Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left chart placeholder */}
        <div className="h-80 bg-slate-800/20 rounded-xl border border-indigo-500/30 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 w-24 h-24 rounded-full mx-auto mb-4 animate-pulse-slow"></div>
            <p className="text-gray-400">Interactive Risk Heatmap</p>
          </div>
        </div>
        {/* Right analytics */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-slate-800/20 border border-indigo-500/20 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-indigo-300">Risk Reduction Trend</h3>
                  <p className="text-gray-300 mt-1">Last 30 days</p>
                </div>
                <span className="text-lg font-bold text-emerald-400">-62%</span>
              </div>
              <div className="mt-3 h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-emerald-500 to-cyan-500 w-4/5 animate-pulse-slow"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">24 critical risks auto-remediated this month</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* 🔹 Resource Heatmap component */
const ResourceHeatmap = ({ resources, onRiskClick }) => (
  <div className={`${CYBER_THEME.card} rounded-2xl p-6`}>
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl font-bold flex items-center">
        <span className={`bg-linear-to-r ${CYBER_THEME.primary} text-transparent bg-clip-text`}>
          Critical Resource Map
        </span>
      </h2>
      <button className="text-gray-400 hover:text-blue-400 transition-colors">
        <ArrowPathIcon className="h-5 w-5" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRiskClick(resource.risk, resource)}
          className={`border rounded-xl p-4 cursor-pointer transition-all transform ${
            resource.risk === "high"
              ? "border-rose-500/30 hover:border-rose-400"
              : resource.risk === "medium"
                ? "border-orange-500/30 hover:border-orange-400"
                : "border-yellow-500/30 hover:border-yellow-400"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-blue-200">
                {resource.name}
              </div>
              <div className="text-sm text-gray-300 mt-1">{resource.type}</div>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                {resource.risk === "high" && (
                  <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded font-medium flex items-center">
                    <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                    CRITICAL
                  </span>
                )}
                {resource.risk === "medium" && (
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded font-medium flex items-center">
                    <CpuChipIcon className="h-3 w-3 mr-1" />
                    MODERATE
                  </span>
                )}
                {resource.risk === "low" && (
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-medium flex items-center">
                    <DocumentCheckIcon className="h-3 w-3 mr-1" />
                    LOW
                  </span>
                )}
                <span className="text-xs text-gray-400">Last scanned: 2m ago</span>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${
              resource.risk === "high"
                ? "bg-rose-500/10"
                : resource.risk === "medium"
                  ? "bg-orange-500/10"
                  : "bg-green-500/10"
            }`}>
              {resource.risk === "high" && <ExclamationTriangleIcon className="h-6 w-6 text-rose-400" />}
              {resource.risk === "medium" && <CpuChipIcon className="h-6 w-6 text-orange-400" />}
              {resource.risk === "low" && <DocumentCheckIcon className="h-6 w-6 text-yellow-400" />}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* 🔹 AI Recommendation Panel */
const AIRecommendationPanel = ({ recommendation, aiReasoning, isThinking, onApprove, onReject, onSimulate, simulationResult }) => (
  <div className={`${CYBER_THEME.card} rounded-2xl p-6 h-full flex flex-col`}>
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl font-bold flex items-center">
        <span className={`bg-linear-to-r ${CYBER_THEME.secondary} text-transparent bg-clip-text`}>
          AI Security Recommendation
        </span>
      </h2>
      <div className="text-sm text-gray-300">
        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded">SAFE TO DEPLOY</span>
      </div>
    </div>
    <div className="mb-6 flex-1">
      {recommendation.icon}
      <h3 className="text-lg font-bold mt-2 bg-clip-text text-transparent bg-linear-to-r from-rose-300 to-rose-400">
        {recommendation.title}
      </h3>
      <p className="text-gray-300 mt-1">{recommendation.risk}</p>
      <p className="mt-3 text-blue-300 font-medium flex items-center">
        <CpuChipIcon className="h-4 w-4 mr-1" />
        Resource: {recommendation.resource?.name}
      </p>
      <div className="mt-4 p-3 bg-slate-800/30 border border-cyan-500/30 rounded-lg">
        <div className="flex items-start">
          <div className="mt-0.5 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-300">
            <span className="text-cyan-400 font-medium">Recommended fix:</span> {recommendation.fix}
          </p>
        </div>
      </div>
      {/* Impact metrics */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-800/30 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300">Risk Reduction</p>
          <p className="text-lg font-bold text-blue-400">87%</p>
        </div>
        <div className="p-3 bg-slate-800/30 border border-emerald-500/20 rounded-lg">
          <p className="text-xs text-emerald-300">Time Saved</p>
          <p className="text-lg font-bold text-emerald-400">42 min</p>
        </div>
      </div>
    </div>
    {/* AI Reasoning */}
    <div className="mb-6">
      <h4 className="font-medium mb-3 flex items-center text-gray-300">
        <CpuChipIcon className="h-4 w-4 text-blue-400 mr-2" />
        <span className={`bg-linear-to-r ${CYBER_THEME.primary} text-transparent bg-clip-text`}>
          AI Security Analysis
        </span>
      </h4>
      <div className="space-y-3">
        {isThinking ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-slate-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          aiReasoning.length > 0 ? (
            aiReasoning.map((reason, i) => (
              <div
                key={i}
                className="flex items-start p-3 bg-slate-800/40 border border-blue-500/20 rounded-lg group hover:border-blue-400 transition-all"
              >
                <div className="mt-1 mr-2 text-blue-400 min-w-[1.2rem]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 102 0V7zM10 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors">{reason}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Select a resource to see AI analysis</p>
          )
        )}
      </div>
    </div>
    {/* Action Buttons */}
    <div className="space-y-4 pt-4 border-t border-white/10">
      {simulationResult && (
        <div className={`p-3 rounded-lg ${
          simulationResult.success
            ? 'bg-green-900/30 border border-green-800'
            : 'bg-amber-900/30 border border-amber-800'
        }`}>
          <p className="text-sm flex items-center">
            {simulationResult.success ? (
              <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
            ) : (
              <ExclamationTriangleIcon className="h-4 w-4 text-amber-400 mr-2" />
            )}
            {simulationResult.details}
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        <button
          disabled={isThinking || recommendation.status !== 'pending'}
          onClick={onApprove}
          className={`px-3 py-2 rounded-lg font-medium flex items-center justify-center transition-all ${
            isThinking || recommendation.status !== 'pending'
              ? 'bg-gray-700 cursor-not-allowed opacity-70'
              : 'bg-linear-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
          }`}
        >
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Deploy
        </button>
        <button
          disabled={isThinking}
          onClick={onSimulate}
          className={`px-3 py-2 rounded-lg font-medium flex items-center justify-center transition-all ${
            isThinking
              ? 'bg-blue-900/50 cursor-wait'
              : 'bg-linear-to-r from-blue-500 to-cyan-600 text-white hover:opacity-90'
          }`}
        >
          {isThinking ? (
            <ArrowPathIcon className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <PlayIcon className="h-4 w-4 mr-1" />
          )}
          {isThinking ? 'Simulating...' : 'Simulate'}
        </button>
        <button
          disabled={isThinking || recommendation.status !== 'pending'}
          onClick={onReject}
          className={`px-3 py-2 rounded-lg font-medium flex items-center justify-center transition-all ${
            isThinking || recommendation.status !== 'pending'
              ? 'bg-gray-700 cursor-not-allowed opacity-70'
              : 'bg-linear-to-r from-red-500 to-rose-600 text-white hover:opacity-90'
          }`}
        >
          <XMarkIcon className="h-4 w-4 mr-1" />
          Reject
        </button>
      </div>
    </div>
  </div>
);

/* 🔹 Enhanced recommendation templates */
const recommendationsByRisk = {
  high: {
    title: "Public Database Exposure",
    risk: "Critical data breach risk",
    fix: "Restrict access to internal IPs only",
    confidence: "98%",
    icon: <ShieldCheckIcon className="h-6 w-6 text-rose-400" />,
    impact: "Prevents unauthorized access to 12,500+ patient records"
  },
  medium: {
    title: "Over-Permissive Firewall Rules",
    risk: "Expanded attack surface",
    fix: "Limit inbound rules to required ports (80, 443)",
    confidence: "92%",
    icon: <CpuChipIcon className="h-6 w-6 text-orange-400" />,
    impact: "Reduces exposure points by 73%"
  },
  low: {
    title: "Unused Resource Detection",
    risk: "Security debt accumulation",
    fix: "Deactivate idle VMs and storage accounts",
    confidence: "87%",
    icon: <DocumentCheckIcon className="h-6 w-6 text-yellow-400" />,
    impact: "Saves $2,400/year in resources"
  },
};

/* 🔹 Comprehensive AI reasoning */
const aiReasoningByRisk = {
  high: [
    "Resource exposes PII/PHI data to public internet without encryption",
    "Violates HIPAA compliance requirements for healthcare providers",
    "Matches attack pattern from recent 2025 ransomware campaigns",
    "Immediate remediation required per NIST 800-53 controls"
  ],
  medium: [
    "Firewall allows unnecessary protocols (SSH/RDP) from 0.0.0.0/0",
    "Creates lateral movement opportunities for compromised accounts",
    "Exceeds principle of least privilege for clinical staff roles",
    "Increases surface area for credential stuffing attacks"
  ],
  low: [
    "Resource shows zero usage for past 30 days but remains active",
    "Creates orphaned credentials in identity management systems",
    "Generates unnecessary compliance audit findings",
    "Increases cloud spend without business justification"
  ]
};

/* 🔹 Realistic resource data */
const resources = [
  { id: 'db-prod-01', name: "PatientRecords-DB", risk: "high", type: "Azure SQL" },
  { id: 'vm-tele-03', name: "Telehealth-App", risk: "medium", type: "VM" },
  { id: 'storage-mri', name: "MRI-Scans", risk: "high", type: "Blob Storage" },
  { id: 'api-gateway', name: "EHR-API", risk: "medium", type: "App Service" },
  { id: 'dev-sandbox', name: "Dev-Sandbox", risk: "low", type: "Resource Group" },
];

export default function CloudSentinelDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({
    stats: [
      {
        id: 'critical',
        title: "Critical Risks",
        value: 3,
        color: "bg-gradient-to-r from-rose-600 to-rose-800",
        icon: <ExclamationTriangleIcon className="h-6 w-6 text-rose-400" />,
        glow: "from-rose-500 to-rose-600"
      },
      {
        id: 'remediated',
        title: "Remediated",
        value: 7,
        color: "bg-gradient-to-r from-green-600 to-green-800",
        icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
        glow: "from-green-500 to-emerald-600"
      },
      {
        id: 'compliance',
        title: "Compliance Score",
        value: "92%",
        color: "bg-gradient-to-r from-blue-600 to-blue-800",
        icon: <DocumentCheckIcon className="h-6 w-6 text-blue-400" />,
        glow: "from-blue-500 to-cyan-600"
      },
      {
        id: 'resources',
        title: "Resources Scanned",
        value: 42,
        color: "bg-gradient-to-r from-purple-600 to-purple-800",
        icon: <CpuChipIcon className="h-6 w-6 text-purple-400" />,
        glow: "from-purple-500 to-fuchsia-600"
      },
    ],
    resources: resources,
    recommendation: {
      ...recommendationsByRisk.high,
      status: "pending",
      resource: resources[0]
    },
    auditLogs: [
      { time: "14:28", action: "Scan completed: 25 issues found", user: "system" },
      { time: "14:30", action: "Critical risk detected in PatientRecords-DB", user: "ai-engine" },
      { time: "14:35", action: "Admin reviewed database exposure alert", user: "clinict-admin" },
    ],
  });

  const [toast, setToast] = useState(null);
  const [aiReasoning, setAiReasoning] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  /* 🔹 Toast manager */
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* 🔹 Action handlers */
  const handleApprove = () => {
    setDashboardData(prev => ({
      ...prev,
      recommendation: { ...prev.recommendation, status: "approved" },
      auditLogs: [{
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `AUTO-REMEDIATION: Fixed ${prev.recommendation.resource.name} exposure`,
        user: "system"
      }, ...prev.auditLogs],
    }));
    showToast("✅ Remediation deployed successfully!", "success");
    setSimulationResult(null);
  };

  const handleReject = () => {
    setDashboardData(prev => ({
      ...prev,
      recommendation: { ...prev.recommendation, status: "rejected" },
      auditLogs: [{
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `Rejected fix for ${prev.recommendation.resource.name}`,
        user: "clinict-admin"
      }, ...prev.auditLogs],
    }));
    showToast("❌ Fix rejected with audit trail", "warning");
    setSimulationResult(null);
  };

  const handleSimulate = async () => {
    setIsThinking(true);
    setSimulationResult(null);
    // Simulate realistic API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const success = Math.random() > 0.2; // 80% success rate for demo
    setSimulationResult({
      success,
      details: success
        ? "✅ Zero downtime detected. Service health maintained at 99.98%"
        : "⚠️ Simulation failed: Dependency conflict in authentication service"
    });
    setIsThinking(false);
    showToast(success
      ? "✅ Safe to deploy - No service impact"
      : "⚠️ Requires manual review before deployment",
      success ? "success" : "error"
    );
    setDashboardData(prev => ({
      ...prev,
      auditLogs: [{
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `Simulation ${success ? 'passed' : 'failed'} for ${prev.recommendation.resource.name}`,
        user: "ai-engine"
      }, ...prev.auditLogs.slice(0, 4)],
    }));
  };

  /* 🔹 Resource click handler */
  const handleRiskClick = (riskLevel, resource) => {
    setIsThinking(true);
    setAiReasoning([]);
    setSimulationResult(null);
    setDashboardData(prev => ({
      ...prev,
      recommendation: {
        ...recommendationsByRisk[riskLevel],
        status: "pending",
        resource
      },
      auditLogs: [{
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `AI analyzing ${riskLevel.toUpperCase()} risk: ${resource.name}`,
        user: "ai-engine"
      }, ...prev.auditLogs.slice(0, 4)], // Keep last 5 logs
    }));
    showToast(`🧠 AI analyzing ${resource.name} risk profile...`, "info");
    // Simulate streaming AI response
    const reasoningPoints = [...aiReasoningByRisk[riskLevel]];
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < reasoningPoints.length) {
        setAiReasoning(prev => [...prev, reasoningPoints[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsThinking(false);
      }
    }, 600);
    return () => clearInterval(interval);
  };

  /* 🔹 New State for Real-Time Clock */
  const [currentTime, setCurrentTime] = useState(new Date());

  /* 🔹 Effect to update the clock every second */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000ms (1 second)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-black text-gray-200 font-sans overflow-x-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #a78bfa);
        }
        @keyframes pulse-slow {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-5 right-5 max-w-md px-6 py-4 rounded-xl shadow-xl z-50 border ${
              toast.type === "success" ? "bg-green-900/90 border-green-800" :
                toast.type === "error" ? "bg-red-900/90 border-red-800" :
                  toast.type === "warning" ? "bg-amber-900/90 border-amber-800" :
                    "bg-blue-900/90 border-blue-800"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 rounded-full ${
                toast.type === "success" ? "bg-green-800" :
                  toast.type === "error" ? "bg-red-800" :
                    toast.type === "warning" ? "bg-amber-800" :
                      "bg-blue-800"
              }`}>
                {toast.type === "success" && <CheckCircleIcon className="h-5 w-5 text-green-400" />}
                {toast.type === "error" && <XMarkIcon className="h-5 w-5 text-red-400" />}
                {toast.type === "warning" && <ExclamationTriangleIcon className="h-5 w-5 text-amber-400" />}
                {toast.type !== "success" && toast.type !== "error" && toast.type !== "warning" && <ArrowPathIcon className="h-5 w-5 text-blue-400 animate-spin" />}
              </div>
              <span className="font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex min-h-screen">
        {/* Enhanced Sidebar with futuristic design */}
        <aside className={`w-64 ${CYBER_THEME.dark} border-r border-white/5 p-5 flex flex-col h-screen sticky top-0 backdrop-blur-xl`}>
          <div className="flex items-center mb-8">
            <div className={`bg-linear-to-r ${CYBER_THEME.primary} p-2.5 rounded-xl mr-3`}>
              <ShieldCheckIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-blue-200">
              CloudSentinel AI
            </h1>
          </div>
          <nav className="space-y-1 flex-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: <CpuChipIcon className="h-5 w-5" /> },
              { id: 'alerts', name: 'Security Alerts', icon: <ExclamationTriangleIcon className="h-5 w-5" /> },
              { id: 'remediation', name: 'Auto-Remediation', icon: <ArrowPathIcon className="h-5 w-5" /> },
              { id: 'audit', name: 'Audit & Compliance', icon: <DocumentCheckIcon className="h-5 w-5" /> },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeSection === item.id
                    ? `bg-linear-to-r ${CYBER_THEME.primary} text-white shadow-lg shadow-blue-500/20`
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={activeSection === item.id ? "text-white" : "text-gray-400"}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <div className={`bg-linear-to-r ${CYBER_THEME.secondary} p-2 rounded-lg`}>
                <ClockIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">Next Autonomous Scan</p>
                {/* Replaced static text with dynamic, real-time clock */}
                <p className="text-xs text-indigo-300 font-mono">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content with smooth transitions */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeSection === 'dashboard' && (
                <DashboardSection
                  data={dashboardData}
                  onRiskClick={handleRiskClick}
                  aiReasoning={aiReasoning}
                  isThinking={isThinking}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onSimulate={handleSimulate}
                  simulationResult={simulationResult}
                />
              )}
              {activeSection === 'alerts' && <AlertsSection />}
              {activeSection === 'remediation' && <RemediationSection />}
              {activeSection === 'audit' && <AuditSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
