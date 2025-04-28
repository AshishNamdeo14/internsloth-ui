import { useState } from "react";
import "../index.css";  
import { motion } from "framer-motion";
import { Upload, Briefcase, FileText, ExternalLink } from "lucide-react";

export default function HomePage() {
  const [uploaded, setUploaded] = useState(false);
  const [roles, setRoles] = useState(["Software Developer", "Data Analyst", "ML Engineer"]);
  const [internships, setInternships] = useState([
    { company: "Google", role: "Software Developer Intern", link: "#" },
    { company: "Meta", role: "Data Analyst Intern", link: "#" },
    { company: "OpenAI", role: "ML Engineer Intern", link: "#" },
  ]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setUploaded(true);
      // Future: send file to backend for analysis
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600">Internsl🦥th</h1>
        <p className="text-gray-500 mt-2">Find your future with AI!</p>
      </motion.header>

      {/* Upload Section */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center mb-12">
        <Upload className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Upload Your Resume</h2>
        <p className="text-gray-400 mb-6">Supported: PDF only</p>
        <label className="cursor-pointer inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
          Upload File
          <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
        </label>
      </motion.div>

      {/* Recommended Roles */}
      {uploaded && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Recommended Job Roles 🎯</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
              <motion.div whileHover={{ scale: 1.05 }} key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                <Briefcase className="w-8 h-8 text-indigo-500 mb-4" />
                <h4 className="text-xl font-semibold text-gray-700 text-center">{role}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Internship Listings */}
      {uploaded && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Matching Internships 📑</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((intern, idx) => (
              <motion.div whileHover={{ scale: 1.03 }} key={idx} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-indigo-500" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">{intern.role}</h4>
                    <p className="text-gray-400">{intern.company}</p>
                  </div>
                </div>
                <a href={intern.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
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
