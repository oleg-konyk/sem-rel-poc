const child_process = require("child_process");

const sanitizeBranchName = () => {
  // https://semver.org/#spec-item-9
  const invalidCharacters = /[&\/\\#,+()$~%_'":*?<>{}]/g;
  const branchName = child_process
    .execSync('git branch --show-current')
    .toString()
    .replace(invalidCharacters, "-")
    .trim();

  return branchName;
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




