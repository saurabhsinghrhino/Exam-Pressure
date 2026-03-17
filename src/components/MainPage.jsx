import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const goFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Safari
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE
    }
  };

  const startExam = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not logged in");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "https://exam-pressure.onrender.com/exams/start",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      console.log(res);

      // const examId = res.data.examId;
      // navigate(`/test/${examId}`);
    } catch (err) {
      console.error("Start exam failed:", err);
      alert("Unable to start exam");
    }
  };
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* User / Navbar already exists */}
      <UserDetails />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-6 py-14 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          Choose Your <span className="text-cyan-400">Exam Setup</span>
        </h1>

        {/* Difficulty Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Select Difficulty</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { level: "Easy", color: "green" },
              { level: "Medium", color: "yellow" },
              { level: "Hard", color: "red" },
            ].map((d) => (
              <div
                key={d.level}
                className="group cursor-pointer rounded-2xl p-6 bg-[#030712] border border-white/10
                  shadow-lg shadow-black/40 hover:scale-105 hover:shadow-cyan-500/30
                  transition-all duration-300"
              >
                <h3
                  className={`text-2xl font-bold text-${d.color}-400 group-hover:tracking-wider transition`}
                >
                  {d.level}
                </h3>
                <p className="text-slate-400 mt-3">
                  {d.level === "Easy" &&
                    "Basic questions to warm up your concepts."}
                  {d.level === "Medium" &&
                    "Balanced difficulty with real exam pressure."}
                  {d.level === "Hard" &&
                    "High-pressure questions for serious preparation."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Choose Subject</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["HTML", "CSS", "JavaScript", "React"].map((subject) => (
              <div
                key={subject}
                className="rounded-2xl p-6 bg-[#030712] border border-white/10
                  shadow-md hover:shadow-indigo-500/30 hover:scale-105
                  transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold">{subject}</h3>
                <p className="text-slate-400 mt-2 text-sm">
                  Timed MCQs with locked navigation and real exam simulation.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Rules */}
        <section className="rounded-2xl bg-white/5 border border-white/10 p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Exam Rules</h2>
          <ul className="space-y-3 text-slate-300 list-disc list-inside">
            <li>Each question is time-bound</li>
            <li>No previous question navigation</li>
            <li>Fullscreen mode is mandatory</li>
            <li>Auto-submit on exit or timeout</li>
            <li>Results remain locked until evaluation</li>
          </ul>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#020617] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact */}
          <div className="text-slate-400 text-sm text-center md:text-left">
            <p>📧 support@exampressure.com</p>
            <p>📞 +91 98765 43210</p>
            <p className="mt-2">
              © {new Date().getFullYear()} ExamPressure. All rights reserved.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={async () => {
              // await goFullscreen();
              startExam();
            }}
            className="px-10 py-4 rounded-full font-bold text-lg
              bg-gradient-to-r from-cyan-500 to-indigo-500
              hover:scale-110 hover:shadow-xl hover:shadow-cyan-500/40
              transition-all duration-300"
          >
            Start Exam Now 🚀
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
