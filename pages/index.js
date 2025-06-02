import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPass, setInputPass] = useState("");

  const projects = [
    {
      name: "Lyrics Finder",
      link: "https://lyrics-wheat.vercel.app/",
      description: "Search and view lyrics instantly.",
    },
    {
      name: "Token Getter",
      link: "https://getnew-xi.vercel.app/",
      description: "Safely extract your Facebook access token.",
    },
    {
      name: "Profile Guard",
      link: "https://profile-guard.vercel.app/",
      description: "Enable Facebook profile picture guard easily.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (inputName.trim()) {
      setUsername(inputName);
      localStorage.setItem("username", inputName);
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>My Projects Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </Head>

      <main className="bg-black text-white min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-800 opacity-10 pointer-events-none"></div>

        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
          </div>
        ) : (
          <>
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-700 px-6 py-4 flex justify-between items-center max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold">My Web Projects</h1>
              <div className="flex gap-4 items-center">
                {username ? (
                  <>
                    <span className="text-sm">Hi, {username}</span>
                    <button
                      onClick={handleLogout}
                      className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Sign In
                  </button>
                )}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-gray-800 rounded-full hover:scale-105 transition"
                >
                  {darkMode ? "🌙" : "☀️"}
                </button>
              </div>
            </header>

            <section className="py-12 px-4">
              <div className="max-w-5xl mx-auto bg-red-700 p-6 sm:p-10 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-[1.01]">
                <div className="grid sm:grid-cols-2 gap-8">
                  {projects.map((proj, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 rounded-xl p-6 shadow-xl transform transition duration-500 hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:rotate-[0.5deg] hover:-translate-y-1"
                    >
                      <h2 className="text-2xl font-semibold mb-2 text-white">
                        {proj.name}
                      </h2>
                      <p className="text-gray-300 mb-4">{proj.description}</p>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center px-5 py-2 font-medium text-white group transition-all duration-300"
                      >
                        <span className="absolute inset-0 w-full h-full transition transform translate-x-1 translate-y-1 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-full blur-sm"></span>
                        <span className="absolute inset-0 w-full h-full bg-black rounded-full border border-white group-hover:border-transparent"></span>
                        <span className="relative">Visit Project</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <a
                    href="https://www.facebook.com/profile.php?id=61576992292379"
                    target="_blank"
                    className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
                  >
                    <i className="fab fa-facebook-f mr-3 text-lg" />
                    Follow me on Facebook
                  </a>
                </div>
              </div>
            </section>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                <div className="bg-white text-black p-6 rounded-lg w-80 animate-fade-in">
                  <h2 className="text-xl font-bold mb-4">Sign In</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-3 py-2 border rounded mb-3"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded mb-4"
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogin}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
          }
                    
