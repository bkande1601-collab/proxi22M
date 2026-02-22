export const PRIVATE_ACCESS_SESSION_KEY = "proxizen-private-access-session";
const PRIVATE_ACCESS_USER_EMAIL_KEY = "proxizen-private-access-user-email";
export const OWNER_EMAIL = "proxizenbtp@gmail.com";
const DEFAULT_PRIVATE_PASSWORD = "ProxizenBtp2026!";

export const getPrivateAccessPassword = () =>
  import.meta.env.VITE_PRIVATE_ACCESS_PASSWORD?.trim() || DEFAULT_PRIVATE_PASSWORD;

export const getAllowedPrivateAccessEmails = () => {
  const emails = [OWNER_EMAIL];
  const clientEmail = import.meta.env.VITE_CLIENT_ACCESS_EMAIL?.trim().toLowerCase();
  if (clientEmail) {
    emails.push(clientEmail);
  }
  return emails;
};

export const isPrivateAccessOpen = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.sessionStorage.getItem(PRIVATE_ACCESS_SESSION_KEY) === "ok";
};

export const openPrivateAccess = (email?: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.setItem(PRIVATE_ACCESS_SESSION_KEY, "ok");
  if (email) {
    window.sessionStorage.setItem(
      PRIVATE_ACCESS_USER_EMAIL_KEY,
      email.trim().toLowerCase(),
    );
  }
};

export const closePrivateAccess = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(PRIVATE_ACCESS_SESSION_KEY);
  window.sessionStorage.removeItem(PRIVATE_ACCESS_USER_EMAIL_KEY);
};

export const validatePrivateAccessCredentials = (
  email: string,
  password: string,
) => {
  const normalizedEmail = email.trim().toLowerCase();
  const isAuthorizedEmail = getAllowedPrivateAccessEmails().includes(normalizedEmail);
  const isValidPassword = password === getPrivateAccessPassword();
  return isAuthorizedEmail && isValidPassword;
};

export const getPrivateAccessUserEmail = () => {
  if (typeof window === "undefined") {
    return OWNER_EMAIL;
  }
  return (
    window.sessionStorage.getItem(PRIVATE_ACCESS_USER_EMAIL_KEY) || OWNER_EMAIL
  );
};
