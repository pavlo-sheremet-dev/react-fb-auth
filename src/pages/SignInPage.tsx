import { UserMenu } from "../components/UserMenu";
import { useAuth } from "../providers";

const SignInPage = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <section>
      <div>
        <h1>SignIn Page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          reprehenderit magnam ipsa tenetur commodi in incidunt sapiente!
          Necessitatibus, ad natus.
        </p>
      </div>
      {!user && (
        <button type="button" onClick={signInWithGoogle}>
          Sign in
        </button>
      )}
      <UserMenu />
    </section>
  );
};

export default SignInPage;
