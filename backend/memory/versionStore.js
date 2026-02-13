let versions = [];
let currentId = 1;

export function saveVersion(code, explanation) {
  const version = {
    id: currentId++,
    code,
    explanation,
    timestamp: Date.now(),
  };
  versions.push(version);
  return version;
}

export function getVersions() {
  return versions;
}

export function getVersionById(id) {
  return versions.find((v) => v.id === id);
}

export function clearVersions() {
  versions = [];
  currentId = 1;
}
