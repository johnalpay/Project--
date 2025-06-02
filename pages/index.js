import { useEffect, useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

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
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <head>
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
      </head>

      <body className="bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-300 dark:border-gray-700">
              <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold">My Web Projects</h1>

                <div className="flex items-center gap-4">
                  <button
                    className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    onClick={() => alert("Sign In Clicked")}
                  >
                    Sign In
                  </button>
                  <button
                    className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                    onClick={() => alert("Login Clicked")}
                  >
                    Login
                  </button>
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

            <main className="flex flex-col items-center justify-center px-4 py-10">
              <div className="max-w-4xl w-full">
                <div className="grid sm:grid-cols-2 gap-6 mb-10 mt-6">
                  {projects.map((proj, index) => (
                    <a
                      key={index}
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition hover:scale-105 hover:shadow-xl animate-fadeIn`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h2 className="text-2xl font-semibold mb-2">{proj.name}</h2>
                      <p className="text-gray-600 dark:text-gray-300">{proj.description}</p>
                      <span className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block">Visit →</span>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=61576992292379"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                  >
                    <i className="fab fa-facebook-f mr-2"></i> Follow on Facebook
                  </a>
                </div>
              </div>
            </main>
          </>
        )}
      </body>
    </html>
  );
            }
                      
