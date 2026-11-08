/* eslint-disable @next/next/no-img-element */
type AvatarProps = {
  name: string;
  image?: string | null;
  className?: string;
};

/** Profile photo when the user has one (Google / GitHub), otherwise their initial. */
export default function Avatar({ name, image, className = "size-9" }: AvatarProps) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        className={`${className} shrink-0 rounded-xl bg-base-200 object-cover`}
      />
    );
  }
  const initial = Array.from(name.trim())[0]?.toUpperCase() ?? "?";
  return (
    <span
      aria-hidden
      className={`${className} grid shrink-0 place-items-center rounded-xl bg-secondary font-bold text-secondary-content`}
    >
      {initial}
    </span>
  );
}
