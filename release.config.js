const child_process = require("child_process");

const branchName = child_process.execSync('git rev-parse --abbrev-ref HEAD');
const sanitizedBranchName = branchName.includes("feat/") ? branchName.replace("feat/", "") : branchName.replace("/", "");

console.log(">>>>>>", sanitizedBranchName)

module.exports = {
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    {name: "beta", prerelease: true},
    {name: "alpha", prerelease: true},
    { name: "feat/**", prerelease:  sanitizedBranchName}
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


