import { NavbarComponent, Footer, Wishlist } from "../../components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function History() {
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const tokenprofile = localStorage.getItem("token");
    if (!tokenprofile) router.push("/login");

    setToken(tokenprofile);
  }, []);

  if (!token) {
    return;
  } else {
    return (
      <div>
        <NavbarComponent />
        <Wishlist />
        <Footer />
      </div>
    );
  }
}
