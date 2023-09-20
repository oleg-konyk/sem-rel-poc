const child_process = require("child_process");

const sanitizeBranchName = () => {
  const invalidCharacters = /[&\/\\#,+()$~%_'":*?<>{}]/g;
  
  return child_process.execSync('git branch --show-current')
    .toString()
    .replace(invalidCharacters, "-")
    .trim();
};

const branches = []


if (sanitizeBranchName().includes("feat")) {
  const rawBranchName = child_process.execSync('git branch --show-current')
    .toString()
    .trim();
  branches.push({ name: rawBranchName, prerelease:  sanitizeBranchName()})
}



module.exports = {
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    {name: "beta", prerelease: true},
    {name: "alpha", prerelease: true},
    ...branches,
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




