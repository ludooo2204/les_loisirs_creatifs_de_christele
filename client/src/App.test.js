import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("admin is christele", () => {
	it("ludo", () => {
		render(
			<Router>
				<Navbar isAdmin={true} />
			</Router>
		);
		expect(screen.getByTestId("connexion")).toBeInTheDocument();
		// const element = screen.getByTestId('custom-element')
	});
	it("admin TEST DE LUDO",async () =>  {
		render(
			<Router>
				<LoginForm />
			</Router>
		);
		fireEvent.click(screen.getByTestId("devAdmin"))
		await waitFor(() => screen.getByTestId("devAdmin").not.toBeInTheDocument(),
		)

		expect(screen.getByTestId("connexion")).not.toBe("toto")
		// const element = screen.getByTestId('custom-element')
	});
});
