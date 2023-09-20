const child_process = require("child_process");

const handleFeatureBranch = () => {
  const invalidCharacters = /[&\/\\#,+()$~%_'":*?<>{}]/g;
  const rawBranchName = child_process.execSync('git branch --show-current')
    .toString()
    .trim();
  const sanitizedBranchName = rawBranchName
    .replace(invalidCharacters, "-")
    .trim();

    if (rawBranchName.includes("feat/")) {
      return [{ name: rawBranchName, prerelease: sanitizedBranchName }];
    }

    return [];
};

module.exports = {
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    {name: "beta", prerelease: true},
    {name: "alpha", prerelease: true},
    ...handleFeatureBranch(),
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




