import { useState } from "react";
import "../index.css";
import { motion } from "framer-motion";
import { Upload, Briefcase, FileText, ExternalLink } from "lucide-react";

const shimmer = `
  animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
`;

export default function HomePage() {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState(["Software Developer"]);
  const [internships, setInternships] = useState([
    { company: "Google", role: "Software Developer Intern", link: "#" },
    { company: "Meta", role: "Data Analyst Intern", link: "#" },
    { company: "OpenAI", role: "ML Engineer Intern", link: "#" },
  ]);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/predict-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload PDF");

      const result = await response.json();
      console.log("Prediction Result:", result);
      setRoles([result.predicted_category]);
      setUploaded(true);
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the file. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-purple-100 px-6 py-10 font-sans transition-all duration-500">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold text-indigo-600 drop-shadow">Internsl🦥th</h1>
        <p className="text-gray-600 mt-2 text-lg">Find your future with AI-powered resume analysis!</p>
      </motion.header>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl mx-auto text-center mb-16"
      >
        {!uploaded ? (
          <>
            <Upload className="w-14 h-14 mx-auto text-indigo-500 mb-6 animate-bounce" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Upload Your Resume</h2>
            <p className="text-gray-400 mb-6">PDF only — we'll analyze it for you</p>
            <label className="cursor-pointer inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all">
              Upload File
              <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
            </label>
          </>
        ) : (
          <>
            <Upload className="w-14 h-14 mx-auto text-green-500 mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-green-600 mb-3">Resume Uploaded!</h2>
            <p className="text-gray-500 mb-4">AI is ready with recommendations 👇</p>
            <button
              onClick={() => setUploaded(false)}
              className="mt-4 text-sm text-indigo-600 hover:underline"
            >
              Upload another resume
            </button>
          </>
        )}
      </motion.div>

      {/* Recommended Roles */}
      {uploaded && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Recommended Roles 🎯</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div key={idx} className={`rounded-xl h-28 ${shimmer}`} />
                  ))
              : roles.map((role, idx) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    key={idx}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all"
                  >
                    <Briefcase className="w-8 h-8 text-indigo-500 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-700 text-center">{role}</h4>
                  </motion.div>
                ))}
          </div>
        </motion.section>
      )}

      {/* Internship Listings */}
      {uploaded && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Matching Internships 📑</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((intern, idx) => (
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100 }}
                key={idx}
                className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-indigo-500" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{intern.role}</h4>
                    <p className="text-gray-500">{intern.company}</p>
                  </div>
                </div>
                <a
                  href={intern.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
