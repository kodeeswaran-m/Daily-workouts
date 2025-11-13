// src/components/__test__/WelcomePage.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomePage from "../WelcomePage";

describe("WelcomePage", () => {
  test("renders heading and subtitle", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /welcome to ems/i })).toBeInTheDocument();
    expect(screen.getByText(/your employee management system made easy/i)).toBeInTheDocument();
  });

  test("renders login and register buttons with correct links", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    const registerButton = screen.getByRole("button", { name: /register/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    expect(loginButton.closest("a")).toHaveAttribute("href", "/login");
    expect(registerButton.closest("a")).toHaveAttribute("href", "/register");
  });

  test("renders footer with current year", () => {
    const currentYear = new Date().getFullYear();

    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(`© ${currentYear} EMS. All rights reserved.`)).toBeInTheDocument();
  });
});
