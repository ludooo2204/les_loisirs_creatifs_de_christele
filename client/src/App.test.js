import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
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
});
