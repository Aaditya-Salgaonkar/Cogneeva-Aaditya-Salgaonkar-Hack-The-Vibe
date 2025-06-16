import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";

const FrontendSignInPage = () => {
  return (
    <ClerkProvider frontendApi="your-frontend-api">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </ClerkProvider>
  );
};

const FrontendSignUpPage = () => {
  return (
    <ClerkProvider frontendApi="your-frontend-api">
      <SignUp path="/sign-up" routing="path" />
    </ClerkProvider>
  );
};