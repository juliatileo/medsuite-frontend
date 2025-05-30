export function abbreviateName(fullName: string): string {
  const particles = ["da", "de", "do", "das", "dos"];
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) return parts[0];

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  const middleParts = parts.slice(1, -1);

  const abbreviatedMiddle = middleParts.map((word = "") => {
    const lower = word.toLowerCase();

    if (particles.includes(lower)) {
      return word;
    } else {
      return word[0].toUpperCase() + ".";
    }
  });

  return [firstName, ...abbreviatedMiddle, lastName].join(" ");
}
