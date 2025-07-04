import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("signin"); // signin or signup
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  // For signin inputs
  const [inputName, setInputName] = useState("");
  const [inputPass, setInputPass] = useState("");

  // For signup inputs
  const [signUpName, setSignUpName] = useState("");
  const [signUpPass, setSignUpPass] = useState("");
  const [signUpAvatarUrl, setSignUpAvatarUrl] = useState("");

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
    const timer = setTimeout(() => setLoading(false), 1000);
    const storedUser = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");
    if (storedUser) setUsername(storedUser);
    if (storedAvatar) setAvatar(storedAvatar);
    return () => clearTimeout(timer);
  }, []);

  // Dummy login validation - just accept non-empty username/pass
  const handleLogin = () => {
    if (inputName.trim() && inputPass.trim()) {
      setUsername(inputName.trim());
      setAvatar(null); // clear old avatar
      localStorage.setItem("username", inputName.trim());
      localStorage.removeItem("avatar"); // no avatar on login by default
      setIsModalOpen(false);
      setInputName("");
      setInputPass("");
    }
  };

  // Dummy signup - save avatar url as profile pic
  const handleSignUp = () => {
    if (signUpName.trim() && signUpPass.trim()) {
      setUsername(signUpName.trim());
      setAvatar(signUpAvatarUrl.trim() || null);
      localStorage.setItem("username", signUpName.trim());
      if (signUpAvatarUrl.trim()) {
        localStorage.setItem("avatar", signUpAvatarUrl.trim());
      } else {
        localStorage.removeItem("avatar");
      }
      setIsModalOpen(false);
      setSignUpName("");
      setSignUpPass("");
      setSignUpAvatarUrl("");
    }
  };

  const handleLogout = () => {
    setUsername("");
    setAvatar(null);
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>My Projects Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  animation: {
                    fadeIn: "fadeIn 1s ease-out both"
                  },
                  keyframes: {
                    fadeIn: {
                      '0%': { opacity: 0, transform: 'translateY(10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }
                }
              }
            }
          `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-m0eK8t4QKpEGnFHjFLWo+kqJ3RfTtGUgZ2Nmrr+38RcyQF9iPnxNzcl3Kj1by93ePfU+/2tZP3TtrqgY66nG8g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <main className="bg-gradient-to-br from-[#f2f4f8] to-[#d0e4ff] dark:from-gray-900 dark:to-black text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Fixed board with "My Web Projects" title */}
            <div className="sticky top-0 z-50 bg-red-700 text-white py-3 shadow-md select-none flex items-center justify-center font-bold text-xl">
              My Web Projects
            </div>

            <header className="sticky top-[48px] z-40 bg-white/90 dark:bg-black/80 backdrop-blur border-b border-gray-300 dark:border-gray-700">
              <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
                {/* Left side: Avatar + Username */}
                <div className="flex items-center gap-3">
                  {username ? (
                    <>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-900"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 font-bold">
                          {username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm">Welcome, {username}</span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Please login or sign up
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {username ? (
                    <button
                      className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        onClick={() => {
                          setModalType("signin");
                          setIsModalOpen(true);
                        }}
                      >
                        Sign In
                      </button>
                      <button
                        className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                        onClick={() => {
                          setModalType("signup");
                          setIsModalOpen(true);
                        }}
                      >
                        Sign Up
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full hover:scale-105 transition"
                    title="Toggle dark mode"
                  >
                    {darkMode ? (
                      <i className="fas fa-sun text-yellow-400"></i>
                    ) : (
                      <i className="fas fa-moon text-gray-700"></i>
                    )}
                  </button>
                </div>
              </div>
            </header>

            <section className="flex flex-col items-center justify-center px-4 py-10">
              <div className="max-w-5xl w-full">
                <div className="grid sm:grid-cols-2 gap-8 mb-10 mt-6">
                  {projects.map((proj, index) => (
                    <a
                      key={index}
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transform transition hover:scale-105 hover:shadow-2xl animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                        {proj.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{proj.description}</p>
                      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:scale-110 hover:shadow-lg transition-transform duration-300">
                        Visit Project →
                      </button>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=61576992292379"
                    target="_blank"
                    className="mt-6 inline-flex items-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 animate-bounce"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f mr-2"></i> Follow me on Facebook
                  </a>
                </div>
              </div>
            </section>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                  {modalType === "signin" ? (
                    <>
                      <h2 className="text-xl font-bold mb-4">Sign In</h2>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded mb-3 text-black"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        autoFocus
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded mb-4 text-black"
                        value={inputPass}
                        onChange={(e) => setInputPass(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleLogin}
                          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Login
                        </button>
                      </div>
                      <p className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <button
                          onClick={() => setModalType("signup")}
                          className="text-blue-600 hover:underline"
                        >
                          Sign Up
                        </button>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded mb-3 text-black"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        autoFocus
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded mb-3 text-black"
                        value={signUpPass}
                        onChange={(e) => setSignUpPass(e.target.value)}
                      />
                      <input
                        type="url"
                        placeholder="Avatar URL (optional)"
                        className="w-full px-4 py-2 border rounded mb-4 text-black"
                        value={signUpAvatarUrl}
                        onChange={(e) => setSignUpAvatarUrl(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSignUp}
                          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Register
                        </button>
                      </div>
                      <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <button
                          onClick={() => setModalType("signin")}
                          className="text-blue-600 hover:underline"
                        >
                          Sign In
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
  }
            
