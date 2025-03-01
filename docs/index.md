# About Me

[![GitHub Profile](https://github.com/sunnybharne.png?size=100)](https://github.com/sunnybharne)

<script>
fetch("https://raw.githubusercontent.com/sunnybharne/sunnybharne/main/README.md")
  .then(response => response.text())
  .then(markdown => {
    document.getElementById("github-readme").innerHTML =
      marked.parse(markdown);
  });
</script>

<div id="github-readme">
  <p>Loading GitHub README...</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

# My Pinned Projects 🚀

<style>
  .project-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }

  .project-card {
    width: 320px;
    background: rgba(25, 25, 25, 0.85); /* Darker for better contrast */
    border-radius: 15px;
    backdrop-filter: blur(10px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
  }

  .project-title {
    font-size: 1.4em;
    font-weight: bold;
    color: #ffffff; /* Ensures visibility on dark background */
    margin-bottom: 10px;
  }

  .project-desc {
    font-size: 1em;
    color: rgba(255, 255, 255, 0.9); /* Lighter for readability */
    margin-bottom: 15px;
  }

  .project-link img {
    width: 140px;
    transition: transform 0.2s ease-in-out;
  }

  .project-link img:hover {
    transform: scale(1.1);
  }
</style>

<div class="project-container">
  
  <div class="project-card">
    <h3 class="project-title">nvim config</h3>
    <p class="project-desc">My personal Neovim configuration.</p>
    <a class="project-link" href="https://github.com/sunnybharne/nvim" target="_blank">
      <img src="https://img.shields.io/badge/View%20on%20GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" alt="My nvim config">
    </a>
  </div>

  <div class="project-card">
    <h3 class="project-title">nvim-gh-actions-snippets</h3>
    <p class="project-desc">Neovim snippets for GitHub Actions.</p>
    <a class="project-link" href="https://github.com/sunnybharne/nvim-gh-actions-snippets" target="_blank">
      <img src="https://img.shields.io/badge/View%20on%20GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" alt="My gh actions snippets">
    </a>
  </div>

  <div class="project-card">
    <h3 class="project-title">Backstage Dev Portal</h3>
    <p class="project-desc">Backstage developer portal for my projects.</p>
    <a class="project-link" href="https://github.com/papliba/developer-portal" target="_blank">
      <img src="https://img.shields.io/badge/View%20on%20GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" alt="Backstage dev portal">
    </a>
  </div>

  <div class="project-card">
    <h3 class="project-title">Papliba Website</h3>
    <p class="project-desc">Papliba website.</p>
    <a class="project-link" href="https://github.com/papliba/papliba" target="_blank">
      <img src="https://img.shields.io/badge/View%20on%20GitHub-24292e?style=for-the-badge&logo=github&logoColor=white" alt="Papliba">
    </a>
  </div>

</div>
