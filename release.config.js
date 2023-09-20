const child_process = require("child_process");

/**
 * to handle feature branches in format of "feat/org-1234-myfeature"
 * we need to sanitize branch name so created tag conforms to https://semver.org/#spec-item-9
 */
const handleFeatureBranch = () => {
  const featureBranchPreFix = "feat/";
  const printBranchCmd = "git branch --show-current";
  const invalidCharacters = /[&\/\\#,+()$~%_'":*?<>{}]/g;
  const rawBranchName = child_process.execSync(printBranchCmd)
    .toString()
    .trim();
  const sanitizedBranchName = rawBranchName
    .replace(invalidCharacters, "-")
    .trim();

    if (rawBranchName.includes(featureBranchPreFix)) {
      // each feat branch needs to be pushed one at a time to keep "prerelease" values unique
      // making "name" a glob pattern is not compatible with dynamic "prerelease" string calculation
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









