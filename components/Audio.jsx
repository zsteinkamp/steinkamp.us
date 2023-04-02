export function YouTube({ src, type }) {
  return (
    <audio controls>
      <source src={src} type={type || "audio/mpeg"} />
    </audio>
  );
}
