// ... (imports and existing code remain unchanged)

export default function Home() {
  // ... (existing state and functions remain unchanged)

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

      <main className="bg-black text-white min-h-screen transition-colors duration-300">
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
          </div>
        ) : (
          <>
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-red-700 shadow-md">
              <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold text-red-500 drop-shadow">My Web Projects</h1>
                <div className="flex items-center gap-4">
                  {username ? (
                    <>
                      <span className="text-sm text-gray-300">Welcome, {username}</span>
                      <button
                        className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Sign In
                    </button>
                  )}

                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full hover:scale-105 transition"
                    title="Toggle dark mode"
                  >
                    {darkMode ? (
                      <i className="fas fa-sun text-yellow-400"></i>
                    ) : (
                      <i className="fas fa-moon text-gray-300"></i>
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
                      className="group block bg-red-600 border border-red-800 rounded-2xl shadow-2xl p-6 transform transition hover:scale-105 hover:shadow-red-700 animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h2 className="text-2xl font-bold mb-2 group-hover:text-white text-white transition">
                        {proj.name}
                      </h2>
                      <p className="text-gray-200 mb-4">{proj.description}</p>
                      <button className="px-4 py-2 rounded-full bg-black text-red-500 border border-red-400 font-semibold hover:bg-red-700 hover:text-white transition shadow-lg">
                        Visit Project →
                      </button>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=61576992292379"
                    target="_blank"
                    className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12a10 10 0 1 0-11.6 9.87v-6.99H8v-2.88h2.4V9.29c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.18 2.13.18v2.35h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.88h-2.22v6.99A10 10 0 0 0 22 12z" />
                    </svg>
                    Follow me on Facebook
                  </a>
                </div>
              </div>
            </section>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-80 border border-red-500">
                  <h2 className="text-xl font-bold mb-4 text-red-400">Sign In</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-700 rounded mb-3 text-white bg-gray-800"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-700 rounded mb-4 text-white bg-gray-800"
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogin}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
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
                      
