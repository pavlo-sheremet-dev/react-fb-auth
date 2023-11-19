import { useAuth } from "../providers";

export const UserMenu = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.subscribe}</p>
      <img src={user.avatar ?? undefined} width={50} height={50} />
    </div>
  );
};
