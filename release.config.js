const child_process = require("child_process");

const sanitizeBranchName = () => {
  const invalidCharacters = /[&\/\\#,+()$~%_'":*?<>{}]/g;
  
  return child_process.execSync('git branch --show-current')
    .toString()
    .replace(invalidCharacters, "-")
    .trim();
};

module.exports = {
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    {name: "beta", prerelease: true},
    {name: "alpha", prerelease: true},
    { name: "feat/**", prerelease:  sanitizeBranchName()}
  ],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits"
      }
    ],
    "@semantic-release/github",
  ]
}




