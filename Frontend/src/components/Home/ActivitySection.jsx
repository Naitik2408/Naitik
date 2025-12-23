import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Code2, 
  GitBranch, 
  Star, 
  Users, 
  Check, 
  Award, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Clock,
  AlertCircle,
  Search,
  TrendingDown,
  Sparkles,
  Swords,
  Laugh,
  HeartHandshake,
  Rocket
} from "lucide-react";

function ActivitySection() {
  // Existing state
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);
  const [leetcodeError, setLeetcodeError] = useState(false);
  const [activeTab, setActiveTab] = useState("github");
  
  // New state for playground
  const [showPlayground, setShowPlayground] = useState(false);
  const [playgroundType, setPlaygroundType] = useState("github");
  const [usernameInput, setUsernameInput] = useState("");
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState(null);
  const [comparisonMessage, setComparisonMessage] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // GitHub has rate limits for unauthenticated requests (60 per hour)
        const username = 'naitik2408';
        
        // Use octokit or a personal access token for higher rate limits in production
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
          throw new Error(`GitHub API request failed: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        
        if (!reposResponse.ok) {
          throw new Error(`GitHub repos API request failed: ${reposResponse.status}`);
        }
        
        const reposData = await reposResponse.json();
        
        // Process and set the data
        setGithubData({
          ...userData,
          topRepos: reposData
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setGithubError(true);
        
        // Set fallback data
        setGithubData({
          name: "Naitik Kumar",
          login: "naitik2408",
          avatar_url: "https://avatars.githubusercontent.com/u/12345678",
          html_url: "https://github.com/naitik2408",
          public_repos: 25,
          followers: 120,
          following: 80,
          bio: "Full Stack Developer & Open Source Enthusiast",
          topRepos: [
            {
              id: 1,
              name: "portfolio",
              html_url: "https://github.com/naitik2408/portfolio",
              description: "My personal portfolio website built with React and TailwindCSS",
              stargazers_count: 18,
              forks_count: 5,
              language: "JavaScript"
            },
            {
              id: 2,
              name: "blog-platform",
              html_url: "https://github.com/naitik2408/blog-platform",
              description: "A full-stack blog platform with React, Node.js, and MongoDB",
              stargazers_count: 32,
              forks_count: 8,
              language: "TypeScript"
            },
            {
              id: 3,
              name: "ai-image-generator",
              html_url: "https://github.com/naitik2408/ai-image-generator",
              description: "AI-powered image generator using OpenAI API",
              stargazers_count: 45,
              forks_count: 12,
              language: "Python"
            }
          ]
        });
      }
    };

    const fetchLeetcodeData = async () => {
      try {
        // Fetch data from the LeetCode API
        const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/naitik2408');
        
        if (!response.ok) {
          throw new Error(`LeetCode API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process recent submissions
        const formattedSubmissions = data.recentSubmissions.slice(0, 5).map((submission, index) => {
          // Convert timestamp to readable date
          const date = new Date(parseInt(submission.timestamp) * 1000);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          
          // Try to determine difficulty - not directly in API
          // This is a best-guess approach since the API doesn't provide difficulty in submissions
          const difficultyMap = {
            "two-sum": "Easy",
            "longest-substring-without-repeating-characters": "Medium",
            "find-peak-element": "Medium",
            "rotate-string": "Easy",
            "valid-perfect-square": "Easy",
            "two-sum-ii-input-array-is-sorted": "Medium",
            "longest-palindromic-substring": "Medium",
            "find-minimum-in-rotated-sorted-array": "Medium",
            "find-minimum-in-rotated-sorted-array-ii": "Hard",
            "count-of-smaller-numbers-after-self": "Hard"
          };
          
          // Default to Medium if unknown
          const difficulty = difficultyMap[submission.titleSlug] || "Medium";
          
          return {
            id: index + 1,
            title: submission.title,
            difficulty: difficulty,
            status: submission.statusDisplay,
            date: formattedDate,
            language: submission.lang
          };
        });
        
        // Calculate acceptance rate
        const acceptanceRate = ((data.totalSolved / data.totalSubmissions[0].submissions) * 100).toFixed(1) + '%';
        
        setLeetcodeData({
          username: "naitik2408",
          totalSolved: data.totalSolved,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          ranking: data.ranking.toLocaleString(),
          acceptanceRate: acceptanceRate,
          recentSubmissions: formattedSubmissions
        });
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
        setLeetcodeError(true);
        
        // Set fallback data in case API fails
        setLeetcodeData({
          username: "naitik2408",
          totalSolved: 75,
          easySolved: 45,
          mediumSolved: 28,
          hardSolved: 2,
          ranking: "1,461,255",
          acceptanceRate: "44.1%",
          recentSubmissions: [
            {
              id: 1,
              title: "Two Sum",
              difficulty: "Easy",
              status: "Accepted",
              date: "May 1, 2023"
            },
            {
              id: 2,
              title: "Longest Substring Without Repeating Characters",
              difficulty: "Medium",
              status: "Accepted",
              date: "Apr 28, 2023"
            },
            {
              id: 3,
              title: "Median of Two Sorted Arrays",
              difficulty: "Hard",
              status: "Accepted",
              date: "Apr 25, 2023"
            }
          ]
        });
      }
    };

    Promise.all([fetchGithubData(), fetchLeetcodeData()])
      .then(() => setLoading(false))
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleCompare = async () => {
    if (!usernameInput) return;
    
    setComparisonLoading(true);
    setComparisonError(null);
    setComparisonData(null);
    setComparisonMessage(null);
    
    try {
      if (playgroundType === "github") {
        // Fetch GitHub comparison data
        const response = await fetch(`https://api.github.com/users/${usernameInput}`);
        
        if (!response.ok) {
          throw new Error(`GitHub API request failed: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Generate comparison message
        let message = "";
        
        // Compare repositories
        if (userData.public_repos > githubData.public_repos) {
          const diff = userData.public_repos - githubData.public_repos;
          message = generateFunnyMessage("more_repos", diff);
        } else if (userData.public_repos < githubData.public_repos) {
          const diff = githubData.public_repos - userData.public_repos;
          message = generateFunnyMessage("less_repos", diff);
        } else {
          message = "We both have exactly the same number of repos. Spooky! Did we just become best friends?";
        }
        
        setComparisonMessage(message);
        setComparisonData(userData);
        
      } else if (playgroundType === "leetcode") {
        // For LeetCode comparison, try to fetch real data if possible
        try {
          // Try to fetch real data for comparison
          const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${usernameInput}`);
          
          if (!response.ok) {
            throw new Error('Could not fetch LeetCode data for this user');
          }
          
          const userData = await response.json();
          
          // Create user data from API response
          const comparisonUserData = {
            username: usernameInput,
            totalSolved: userData.totalSolved || 0,
            easySolved: userData.easySolved || 0,
            mediumSolved: userData.mediumSolved || 0,
            hardSolved: userData.hardSolved || 0,
            ranking: userData.ranking?.toLocaleString() || "Unknown",
            acceptanceRate: ((userData.totalSolved / (userData.totalSubmissions?.[0]?.submissions || 1)) * 100).toFixed(1) + '%'
          };
          
          // Generate comparison message
          let message = "";
          
          if (comparisonUserData.totalSolved > leetcodeData.totalSolved) {
            const diff = comparisonUserData.totalSolved - leetcodeData.totalSolved;
            message = generateFunnyMessage("more_leetcode", diff);
          } else if (comparisonUserData.totalSolved < leetcodeData.totalSolved) {
            const diff = leetcodeData.totalSolved - comparisonUserData.totalSolved;
            message = generateFunnyMessage("less_leetcode", diff);
          } else {
            message = "We've solved exactly the same number of problems! Great minds think alike!";
          }
          
          setComparisonMessage(message);
          setComparisonData(comparisonUserData);
          
        } catch (error) {
          console.error("Error fetching LeetCode comparison data:", error);
          
          // Fall back to random mock data if API fails
          const yourTotal = leetcodeData.totalSolved;
          let theirTotal;
          
          // Create a random number around the user's count
          const randomOffset = Math.floor(Math.random() * 50) - 25; // Random between -25 and 25
          theirTotal = Math.max(1, yourTotal + randomOffset); // Make sure it's at least 1
          
          // Create mock user data
          const mockUserData = {
            username: usernameInput,
            totalSolved: theirTotal,
            easySolved: Math.floor(theirTotal * 0.6),
            mediumSolved: Math.floor(theirTotal * 0.35),
            hardSolved: Math.floor(theirTotal * 0.05),
            ranking: theirTotal > yourTotal ? 
                    Math.floor(parseInt(leetcodeData.ranking.replace(/,/g, '')) * 0.7).toLocaleString() : 
                    Math.floor(parseInt(leetcodeData.ranking.replace(/,/g, '')) * 1.3).toLocaleString(),
            acceptanceRate: `${Math.floor(60 + Math.random() * 20)}%`
          };
          
          // Generate comparison message
          let message = "";
          
          if (mockUserData.totalSolved > leetcodeData.totalSolved) {
            const diff = mockUserData.totalSolved - leetcodeData.totalSolved;
            message = generateFunnyMessage("more_leetcode", diff);
          } else if (mockUserData.totalSolved < leetcodeData.totalSolved) {
            const diff = leetcodeData.totalSolved - mockUserData.totalSolved;
            message = generateFunnyMessage("less_leetcode", diff);
          } else {
            message = "We've solved exactly the same number of problems! Great minds think alike!";
          }
          
          setComparisonMessage(message);
          setComparisonData(mockUserData);
        }
      }
    } catch (error) {
      console.error("Error comparing data:", error);
      setComparisonError(`Error finding user "${usernameInput}". Make sure the username is correct.`);
    } finally {
      setComparisonLoading(false);
    }
  };
  
  const generateFunnyMessage = (type, diff) => {
    const messages = {
      more_repos: [
        `Impressive! You have ${diff} more repos than me. But are they quality or quantity? 😉`,
        `Look at you, ${diff} more repos! Save some code for the rest of us! 🚀`,
        `Whoa! ${diff} more repos? You must not sleep much! 😴`,
        `${diff} more repos? Well played! I'm coming for your crown though! 👑`,
        `I'm not saying you're showing off with those ${diff} extra repos, but... okay I am! 🔥`
      ],
      less_repos: [
        `You're only ${diff} repos behind me. Keep pushing! You'll catch up soon! 💪`,
        `Don't worry about those ${diff} fewer repos. Quality over quantity, right? (That's what I tell myself too) 😂`,
        `Only ${diff} repos behind - but your GitHub journey is just beginning! 🌱`,
        `I've got ${diff} more repos, but who's counting? (Me, I'm counting) 🧮`,
        `Just ${diff} more repos to catch up! I believe in you! 🌟`
      ],
      more_leetcode: [
        `${diff} more problems solved? You're a LeetCode machine! 🤖`,
        `Whoa! ${diff} more solutions? Save some green squares for the rest of us! 🟩`,
        `I bow to your LeetCode prowess! ${diff} more problems is seriously impressive. 👑`,
        `${diff} ahead of me? Were you born with algorithms in your veins? 🧬`,
        `Fine, you win this round with ${diff} more problems. Challenge accepted though! 🎯`
      ],
      less_leetcode: [
        `Only ${diff} problems behind me? You're catching up fast! 🏃‍♂️`,
        `Don't worry about those ${diff} problems - I just had a head start! 🏁`,
        `${diff} more problems on my side, but your acceptance rate might be better! 📈`,
        `I've grinded ${diff} more problems, but we all start somewhere! Keep going! 💯`,
        `Those ${diff} problems took me many late nights and coffee! You'll get there! ☕`
      ]
    };
    
    // Pick a random message from the appropriate category
    const category = messages[type];
    const randomIndex = Math.floor(Math.random() * category.length);
    return category[randomIndex];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-slate-300';
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      "JavaScript": "bg-yellow-400/20 text-yellow-200 border-yellow-400/30",
      "TypeScript": "bg-blue-400/20 text-blue-200 border-blue-400/30",
      "Python": "bg-green-400/20 text-green-200 border-green-400/30",
      "Java": "bg-orange-400/20 text-orange-200 border-orange-400/30",
      "C#": "bg-purple-400/20 text-purple-200 border-purple-400/30",
      "PHP": "bg-indigo-400/20 text-indigo-200 border-indigo-400/30",
      "Ruby": "bg-red-400/20 text-red-200 border-red-400/30",
      "Go": "bg-cyan-400/20 text-cyan-200 border-cyan-400/30",
      "Swift": "bg-orange-400/20 text-orange-200 border-orange-400/30",
      "Kotlin": "bg-purple-400/20 text-purple-200 border-purple-400/30"
    };
    
    return colors[language] || "bg-slate-400/20 text-slate-200 border-slate-400/30";
  };

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-10 homepage-section text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-20"></div>
              <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
              <p className="mt-24 text-cyan-300 animate-pulse text-lg font-medium">Loading activity data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 md:px-10 homepage-section text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4 mb-10"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-white-cyan-indigo">
              My Coding Activity
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Check out my latest contributions and coding challenges from GitHub and LeetCode.
              {githubError && " Note: GitHub data is currently showing placeholder information due to API limitations."}
            </p>
          </motion.div>

          {/* Tab Selection */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10 flex-wrap gap-4">
            <div className="backdrop-blur-md bg-white/5 p-1 rounded-xl border border-white/10 inline-flex">
              <button
                onClick={() => setActiveTab("github")}
                className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                  activeTab === "github" 
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg" 
                    : "hover:bg-white/10 text-slate-300"
                }`}
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </button>
              <button
                onClick={() => setActiveTab("leetcode")}
                className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                  activeTab === "leetcode" 
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg" 
                    : "hover:bg-white/10 text-slate-300"
                }`}
              >
                <Code2 className="h-5 w-5" />
                <span>LeetCode</span>
              </button>
            </div>
            
            <button
              onClick={() => setShowPlayground(!showPlayground)}
              className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                showPlayground 
                  ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg" 
                  : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
              }`}
            >
              <Swords className="h-5 w-5" />
              <span>Challenge Me</span>
            </button>
          </motion.div>
          
          {/* Playground Section */}
          {showPlayground && (
            <motion.div
              variants={popIn}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 md:p-8 mb-12"
            >
              <h3 className="text-2xl font-bold mb-4 text-gradient-white-cyan-indigo flex items-center">
                <Swords className="h-6 w-6 mr-2" />
                Coder Showdown
              </h3>
              <p className="text-slate-300 mb-6">
                Compare your GitHub repos or LeetCode problems with mine. Let's see who's the coding champion!
              </p>
              
              <div className="space-y-6">
                {/* Platform Selection */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setPlaygroundType("github")}
                    className={`px-5 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                      playgroundType === "github" 
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg" 
                        : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                    }`}
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub Comparison</span>
                  </button>
                  <button
                    onClick={() => setPlaygroundType("leetcode")}
                    className={`px-5 py-2.5 rounded-lg font-medium flex items-center space-x-2 transition-all ${
                      playgroundType === "leetcode" 
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg" 
                        : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                    }`}
                  >
                    <Code2 className="h-5 w-5" />
                    <span>LeetCode Comparison</span>
                  </button>
                </div>
                
                {/* Username Input */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={`Enter your ${playgroundType === "github" ? "GitHub" : "LeetCode"} username`}
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-400"
                    />
                  </div>
                  <button
                    onClick={handleCompare}
                    disabled={comparisonLoading || !usernameInput}
                    className={`px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
                      comparisonLoading || !usernameInput
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg hover:from-indigo-600 hover:to-cyan-600"
                    }`}
                  >
                    {comparisonLoading ? (
                      <><span className="animate-spin mr-2">⟳</span> Comparing</>
                    ) : (
                      <>Compare</>
                    )}
                  </button>
                </div>
                
                {/* Error Message */}
                {comparisonError && (
                  <div className="px-4 py-3 bg-red-400/20 text-red-200 border border-red-400/30 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{comparisonError}</p>
                  </div>
                )}
                
                {/* Comparison Results */}
                {comparisonData && !comparisonError && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pt-4 border-t border-white/10"
                  >
                    {/* Fun comparison message */}
                    {comparisonMessage && (
                      <div className="px-6 py-4 mb-6 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg border border-indigo-500/30 flex items-start">
                        <Laugh className="h-6 w-6 text-cyan-300 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-200 text-lg">{comparisonMessage}</p>
                      </div>
                    )}
                    
                    {/* Stats Comparison Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* My Stats */}
                      <div className="backdrop-blur-md bg-white/5 rounded-lg border border-white/10 p-5">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 animate-border-pulse p-1"></div>
                            {playgroundType === "github" ? (
                              <img 
                                src={githubData.avatar_url} 
                                alt={githubData.name} 
                                className="rounded-full w-16 h-16 object-cover border-2 border-white/10"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://avatars.githubusercontent.com/u/583231?v=4";
                                }}
                              />
                            ) : (
                              <div className="rounded-full bg-gray-900 w-16 h-16 flex items-center justify-center">
                                <Code2 className="h-8 w-8 text-cyan-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{playgroundType === "github" ? githubData.name : leetcodeData.username}</h4>
                            <p className="text-indigo-300">@{playgroundType === "github" ? githubData.login : leetcodeData.username}</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        {playgroundType === "github" ? (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.public_repos}</p>
                              <p className="text-xs text-slate-300">Repositories</p>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.followers}</p>
                              <p className="text-xs text-slate-300">Followers</p>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.following}</p>
                              <p className="text-xs text-slate-300">Following</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between">
                              <p className="text-sm text-slate-300">Problems Solved</p>
                              <p className="text-xl font-bold text-gradient-white-cyan-indigo">{leetcodeData.totalSolved}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-green-500/20 text-center">
                                <p className="text-sm font-bold text-green-400 mb-1">{leetcodeData.easySolved}</p>
                                <p className="text-xs text-slate-300">Easy</p>
                              </div>
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-yellow-500/20 text-center">
                                <p className="text-sm font-bold text-yellow-400 mb-1">{leetcodeData.mediumSolved}</p>
                                <p className="text-xs text-slate-300">Medium</p>
                              </div>
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-red-500/20 text-center">
                                <p className="text-sm font-bold text-red-400 mb-1">{leetcodeData.hardSolved}</p>
                                <p className="text-xs text-slate-300">Hard</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Their Stats */}
                      <div className="backdrop-blur-md bg-white/5 rounded-lg border border-white/10 p-5">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-amber-400 animate-border-pulse p-1"></div>
                            {playgroundType === "github" && comparisonData.avatar_url ? (
                              <img 
                                src={comparisonData.avatar_url} 
                                alt={comparisonData.name} 
                                className="rounded-full w-16 h-16 object-cover border-2 border-white/10"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://avatars.githubusercontent.com/u/583231?v=4";
                                }}
                              />
                            ) : (
                              <div className="rounded-full bg-gray-900 w-16 h-16 flex items-center justify-center">
                                <Code2 className="h-8 w-8 text-pink-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{playgroundType === "github" ? comparisonData.name || comparisonData.login : comparisonData.username}</h4>
                            <p className="text-pink-300">@{playgroundType === "github" ? comparisonData.login : comparisonData.username}</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        {playgroundType === "github" ? (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-pink-amber mb-1">{comparisonData.public_repos}</p>
                              <p className="text-xs text-slate-300">Repositories</p>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-pink-amber mb-1">{comparisonData.followers}</p>
                              <p className="text-xs text-slate-300">Followers</p>
                            </div>
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                              <p className="text-xl font-bold text-gradient-white-pink-amber mb-1">{comparisonData.following}</p>
                              <p className="text-xs text-slate-300">Following</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between">
                              <p className="text-sm text-slate-300">Problems Solved</p>
                              <p className="text-xl font-bold text-gradient-white-pink-amber">{comparisonData.totalSolved}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-green-500/20 text-center">
                                <p className="text-sm font-bold text-green-400 mb-1">{comparisonData.easySolved}</p>
                                <p className="text-xs text-slate-300">Easy</p>
                              </div>
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-yellow-500/20 text-center">
                                <p className="text-sm font-bold text-yellow-400 mb-1">{comparisonData.mediumSolved}</p>
                                <p className="text-xs text-slate-300">Medium</p>
                              </div>
                              <div className="backdrop-blur-md bg-white/5 rounded-lg p-2 border border-red-500/20 text-center">
                                <p className="text-sm font-bold text-red-400 mb-1">{comparisonData.hardSolved}</p>
                                <p className="text-xs text-slate-300">Hard</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* The difference visualization */}
                    <div className="mt-6 text-center">
                      <h4 className="mb-3 text-slate-300">Who's ahead?</h4>
                      <div className="relative h-10 bg-white/10 rounded-full overflow-hidden">
                        <div className="absolute inset-0 flex">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full flex items-center justify-end"
                            style={{
                              width: playgroundType === "github"
                                ? `${(githubData.public_repos / (githubData.public_repos + comparisonData.public_repos)) * 100}%`
                                : `${(leetcodeData.totalSolved / (leetcodeData.totalSolved + comparisonData.totalSolved)) * 100}%`
                            }}
                          >
                            {playgroundType === "github"
                              ? (githubData.public_repos > comparisonData.public_repos) && <Rocket className="h-5 w-5 text-white mx-2" />
                              : (leetcodeData.totalSolved > comparisonData.totalSolved) && <Rocket className="h-5 w-5 text-white mx-2" />
                            }
                          </div>
                          <div
                            className="bg-gradient-to-r from-pink-500 to-amber-500 h-full flex items-center justify-start"
                            style={{
                              width: playgroundType === "github"
                                ? `${(comparisonData.public_repos / (githubData.public_repos + comparisonData.public_repos)) * 100}%`
                                : `${(comparisonData.totalSolved / (leetcodeData.totalSolved + comparisonData.totalSolved)) * 100}%`
                            }}
                          >
                            {playgroundType === "github"
                              ? (comparisonData.public_repos > githubData.public_repos) && <Rocket className="h-5 w-5 text-white mx-2" />
                              : (comparisonData.totalSolved > leetcodeData.totalSolved) && <Rocket className="h-5 w-5 text-white mx-2" />
                            }
                          </div>
                        </div>
                        
                        {/* Center marker */}
                        <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-white/40"></div>
                      </div>
                      
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-indigo-300">@{playgroundType === "github" ? githubData.login : leetcodeData.username}</span>
                        <span className="text-pink-300">@{playgroundType === "github" ? comparisonData.login : comparisonData.username}</span>
                      </div>
                    </div>
                    
                    {/* Footer with motivational message */}
                    <div className="mt-8 text-center">
                      <HeartHandshake className="h-8 w-8 text-indigo-300 inline-block mb-2" />
                      <p className="text-slate-300">
                        Remember, coding is a journey, not a competition! We all grow and learn together.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* GitHub Content */}
          {activeTab === "github" && githubData && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={itemVariants}
            >
              {/* GitHub Profile */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 h-full">
                  {githubError && (
                    <div className="mb-4 px-4 py-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 rounded-lg flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>Using placeholder data. GitHub API rate limit may have been reached.</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 animate-border-pulse p-1"></div>
                      <img 
                        src={githubData.avatar_url} 
                        alt={githubData.name} 
                        className="rounded-full w-28 h-28 object-cover border-2 border-white/10"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://avatars.githubusercontent.com/u/583231?v=4"; // Default GitHub octocat image
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">{githubData.name || "Naitik Kumar"}</h3>
                    <p className="text-cyan-300 mb-2">@{githubData.login}</p>
                    <p className="text-slate-300 text-sm mb-4">{githubData.bio || "Full Stack Developer & Open Source Enthusiast"}</p>
                    <a 
                      href={githubData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Profile
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                      <p className="text-2xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.public_repos}</p>
                      <p className="text-xs text-slate-300">Repositories</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                      <p className="text-2xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.followers}</p>
                      <p className="text-xs text-slate-300">Followers</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                      <p className="text-2xl font-bold text-gradient-white-cyan-indigo mb-1">{githubData.following}</p>
                      <p className="text-xs text-slate-300">Following</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg border border-indigo-500/30 flex items-center">
                    <Zap className="h-5 w-5 text-cyan-300 mr-2" />
                    <p className="text-sm text-slate-200">Active GitHub contributor</p>
                  </div>
                </div>
              </div>
              
              {/* GitHub Repositories */}
              <div className="lg:col-span-2">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl h-full overflow-hidden">
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <GitBranch className="h-5 w-5 text-cyan-300 mr-2" />
                      Recent Repositories
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {githubData.topRepos && githubData.topRepos.map((repo) => (
                      <div key={repo.id} className="p-6 hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <a 
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-indigo-300 hover:text-cyan-300 transition-colors"
                          >
                            {repo.name}
                          </a>
                          <div className="flex space-x-3 text-sm text-slate-300">
                            <span className="flex items-center">
                              <Star className="h-4 w-4 text-amber-400 mr-1" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center">
                              <GitBranch className="h-4 w-4 text-indigo-400 mr-1" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 mb-4 text-sm">{repo.description}</p>
                        
                        {repo.language && (
                          <span className={`px-3 py-1 rounded-full text-xs inline-flex items-center border ${getLanguageColor(repo.language)}`}>
                            {repo.language}
                          </span>
                        )}
                      </div>
                    ))}
                    
                    {(!githubData.topRepos || githubData.topRepos.length === 0) && (
                      <div className="p-8 text-center">
                        <p className="text-slate-300">No repositories found or unable to load repositories.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-white/10">
                    <a 
                      href={githubData.html_url + '?tab=repositories'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 text-center text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      View All Repositories
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LeetCode Content */}
          {activeTab === "leetcode" && leetcodeData && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={itemVariants}
            >
              {/* LeetCode Stats */}
              <div className="lg:col-span-1">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 h-full">
                  {leetcodeError && (
                    <div className="mb-4 px-4 py-2 bg-amber-400/20 text-amber-200 border border-amber-400/30 rounded-lg flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p>Using fallback data. LeetCode API may be temporarily unavailable.</p>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-4 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 p-1 h-28 w-28 flex items-center justify-center">
                      <div className="bg-gray-900 rounded-full h-full w-full flex items-center justify-center">
                        <Code2 className="h-12 w-12 text-cyan-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{leetcodeData.username}</h3>
                    <p className="text-cyan-300 mb-2">LeetCode Profile</p>
                    <div className="flex items-center mb-4">
                      <span className="text-sm text-slate-300 flex items-center">
                        <Award className="h-4 w-4 text-amber-400 mr-1" />
                        Rank: {leetcodeData.ranking}
                      </span>
                      <span className="mx-2 h-1 w-1 rounded-full bg-slate-600"></span>
                      <span className="text-sm text-slate-300 flex items-center">
                        <Check className="h-4 w-4 text-green-400 mr-1" />
                        {leetcodeData.acceptanceRate} Acceptance
                      </span>
                    </div>
                    <a 
                      href={`https://leetcode.com/${leetcodeData.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all"
                    >
                      <Code2 className="h-4 w-4 mr-2" />
                      View Profile
                    </a>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <p className="text-slate-300 text-sm">Problems Solved</p>
                      <p className="text-white font-bold">{leetcodeData.totalSolved}</p>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-green-500 h-full"
                        style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500 h-full"
                        style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-full"
                        style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <div>
                        <span className="inline-block h-3 w-3 bg-green-500 rounded-full mr-1"></span>
                        <span className="text-green-400">Easy ({leetcodeData.easySolved})</span>
                      </div>
                      <div>
                        <span className="inline-block h-3 w-3 bg-yellow-500 rounded-full mr-1"></span>
                        <span className="text-yellow-400">Medium ({leetcodeData.mediumSolved})</span>
                      </div>
                      <div>
                        <span className="inline-block h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                        <span className="text-red-400">Hard ({leetcodeData.hardSolved})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg border border-indigo-500/30 flex items-center">
                    <TrendingUp className="h-5 w-5 text-cyan-300 mr-2" />
                    <p className="text-sm text-slate-200">Consistent problem solver</p>
                  </div>
                </div>
              </div>
              
              {/* LeetCode Recent Submissions */}
              <div className="lg:col-span-2">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl h-full overflow-hidden">
                  <div className="p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <BarChart3 className="h-5 w-5 text-cyan-300 mr-2" />
                      Recent Submissions
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-white/10">
                    {leetcodeData.recentSubmissions.map((submission) => (
                      <div key={submission.id} className="p-6 hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <a 
                            href={`https://leetcode.com/problems/${submission.title.toLowerCase().replace(/\s+/g, '-')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-indigo-300 hover:text-cyan-300 transition-colors"
                          >
                            {submission.title}
                          </a>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              submission.status === "Accepted" 
                                ? "bg-green-400/20 text-green-200 border border-green-400/30" 
                                : "bg-amber-400/20 text-amber-200 border border-amber-400/30"
                            }`}>
                              {submission.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className={`${getDifficultyColor(submission.difficulty)} text-sm font-medium`}>
                            {submission.difficulty}
                          </span>
                          
                          <span className="text-slate-400 text-sm flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {submission.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-white/10">
                    <a 
                      href={`https://leetcode.com/${leetcodeData.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 text-center text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      View All Submissions
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Coding Skills Visualization */}
              <div className="lg:col-span-3">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Award className="h-5 w-5 text-cyan-300 mr-2" />
                    LeetCode Progress
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Example data for visualization - in a real app, you would use real data */}
                    <div className="p-4 backdrop-blur-md bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-slate-300 text-sm">Algorithms</h4>
                        <span className="text-cyan-300 text-sm font-medium">75%</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 backdrop-blur-md bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-slate-300 text-sm">Data Structures</h4>
                        <span className="text-cyan-300 text-sm font-medium">82%</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 backdrop-blur-md bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-slate-300 text-sm">Database</h4>
                        <span className="text-cyan-300 text-sm font-medium">60%</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <style jsx>{`
        .text-gradient-white-cyan-indigo {
          background: linear-gradient(to right, #fff, #22d3ee, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .text-gradient-white-pink-amber {
          background: linear-gradient(to right, #fff, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        @keyframes border-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-border-pulse {
          animation: border-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}

export default ActivitySection;