import { SummaryApi } from "../common/summaryApi";
import Axios from "../utils/axios";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const res = await Axios({
    ...SummaryApi.user.login,
    data: { email, password },
  });

  if (res.status !== 200) throw new Error(res.data.error);

  // Manually extract tokens from cookies and save to localStorage
  // This ensures the Axios interceptor can pick them up immediately

  // Wait a brief moment for cookies to be set if needed
  await new Promise((resolve) => setTimeout(resolve, 100));

  const cookies = document.cookie.split(";");
  let tokenFound = false;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "accessToken") {
      localStorage.setItem("accessToken", value);
      tokenFound = true;
    }
    if (name === "refernceToken") localStorage.setItem("refreshToken", value);
  });

  if (!tokenFound) {
    console.warn(
      "AccessToken cookie not found! Check if server is setting it correctly or if it's HttpOnly."
    );
  }

  return res.data;
}

export async function getCurrentUser() {
  try {
    const { data } = await Axios({
      ...SummaryApi.user.currentSession,
    });

    // Check for success flag from your API response structure
    if (!data.success || !data.data?.session) return null;

    // Return the user data from the nested structure
    return {
      email: data.data.email,
      user_metadata: data.data.user_metadata,
      session: data.data.session,
      role: "authenticated",
    };
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}

export async function logout() {
  try {
    await Axios({
      ...SummaryApi.user.logout,
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const { data } = await Axios({
    ...SummaryApi,
    data: { password, fullName, avatar },
  });
  return data;
}
