import { useState, useCallback } from "react";
import {
  Upload,
  AlertTriangle,
  CheckCircle2,
  Shield,
  FileSpreadsheet,
  X,
  Activity,
  BarChart3,
  Loader2,
} from "lucide-react";

const AttackDetector = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const attackConfig = {
    Benign: {
      color: "bg-emerald-500",
      text: "text-emerald-700 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/20",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    Bot: {
      color: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/20",
      icon: <Activity className="w-5 h-5" />,
    },
    "Brute Force": {
      color: "bg-orange-500",
      text: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      border: "border-orange-200 dark:border-orange-500/20",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    DDoS: {
      color: "bg-red-500",
      text: "text-red-700 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
      border: "border-red-200 dark:border-red-500/20",
      icon: <Activity className="w-5 h-5" />,
    },
    Infiltration: {
      color: "bg-purple-500",
      text: "text-purple-700 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/20",
      icon: <Shield className="w-5 h-5" />,
    },
    PortScan: {
      color: "bg-cyan-500",
      text: "text-cyan-700 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-500/20",
      icon: <Activity className="w-5 h-5" />,
    },
    "Web Attack": {
      color: "bg-rose-500",
      text: "text-rose-700 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/20",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setResults(null);
      setError(null);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResults(null);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      // Expected response format:
      // { predictions: [{ class: "DDoS", confidence: 0.98, probabilities: {...} }, ...] }
      setResults(data.predictions || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResults(null);
    setError(null);
  };

  const getThreatLevel = (attackClass) => {
    if (attackClass === "Benign")
      return { label: "Safe", color: "text-emerald-700 dark:text-emerald-400" };
    if (["DDoS", "Infiltration", "Web Attack"].includes(attackClass))
      return { label: "Critical", color: "text-red-700 dark:text-red-400" };
    return { label: "Warning", color: "text-amber-700 dark:text-amber-400" };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 p-6 dark:bg-slate-950 dark:text-slate-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Attack Detection Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload a CSV file containing CICIDS2017 network features to classify
            traffic and detect threats.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200
              ${
                dragActive
                  ? "border-blue-500 bg-blue-500/5 scale-[1.02]"
                  : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-slate-600 dark:hover:bg-slate-900"
              }
            `}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {!file ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center dark:bg-slate-800">
                  <Upload className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    Drop your CSV file here, or click to browse
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Supports CICIDS2017 feature format
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <FileSpreadsheet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>
            )}
          </div>

          {file && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Network Traffic...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  Run Detection
                </>
              )}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Detection Results
              </h2>
              <span className="text-sm text-slate-500 ml-2">
                ({results.length} records analyzed)
              </span>
            </div>

            <div className="grid gap-4">
              {results.map((result, idx) => {
                const attackClass =
                  result.class || result.prediction || "Benign";
                const confidence = result.confidence || result.probability || 0;
                const probs =
                  result.probabilities || result.class_probabilities || {};
                const config = attackConfig[attackClass] || attackConfig.Benign;
                const threat = getThreatLevel(attackClass);

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border ${config.border} ${config.bg} p-6 backdrop-blur-sm transition-all hover:scale-[1.01]`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${config.bg} ${config.text}`}
                        >
                          {config.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {attackClass}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded-full bg-white ${threat.color} border border-current dark:bg-slate-950`}
                            >
                              {threat.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Record #{idx + 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                          {(confidence * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-500">
                          Confidence
                        </div>
                      </div>
                    </div>

                    {/* Probability Bars */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Class Probabilities
                      </p>
                      {Object.entries(probs).length > 0 ? (
                        Object.entries(probs)
                          .sort(([, a], [, b]) => b - a)
                          .map(([cls, prob]) => {
                            const clsConfig =
                              attackConfig[cls] || attackConfig.Benign;
                            const percentage = (prob * 100).toFixed(1);
                            return (
                              <div
                                key={cls}
                                className="flex items-center gap-3"
                              >
                                <span className="text-xs font-medium w-24 text-slate-600 dark:text-slate-400 truncate">
                                  {cls}
                                </span>
                                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                                  <div
                                    className={`h-full ${clsConfig.color} rounded-full transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-xs font-mono w-12 text-right text-slate-700 dark:text-slate-300">
                                  {percentage}%
                                </span>
                              </div>
                            );
                          })
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium w-24 text-slate-600 dark:text-slate-400">
                            {attackClass}
                          </span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-800">
                            <div
                              className={`h-full ${config.color} rounded-full transition-all duration-500`}
                              style={{ width: `${confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono w-12 text-right text-slate-700 dark:text-slate-300">
                            {(confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {(() => {
                const counts = results.reduce((acc, r) => {
                  const cls = r.class || r.prediction || "Benign";
                  acc[cls] = (acc[cls] || 0) + 1;
                  return acc;
                }, {});

                return Object.entries(counts).map(([cls, count]) => {
                  const cfg = attackConfig[cls] || attackConfig.Benign;
                  return (
                    <div
                      key={cls}
                      className={`p-4 rounded-xl border ${cfg.border} ${cfg.bg} text-center`}
                    >
                      <div className={`text-2xl font-bold ${cfg.text}`}>
                        {count}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 dark:text-slate-400">
                        {cls}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackDetector;
