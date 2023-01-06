import { render, screen } from "@testing-library/react";
import { NavbarComponent, Footer, Airline } from "../../components";

test("renders the Landing Page", () => {
  render(<NavbarComponent />);
  render(<Footer />);
  render(<Airline />);
});
