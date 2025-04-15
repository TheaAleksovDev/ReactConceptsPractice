import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Buddies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show buddy options when clicked", async () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /get options/i })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /get options/i }));
    const imgs = await screen.findAllByRole("img", { name: /buddy-image/i });
    expect(imgs.length).toBe(9);
  });

  it("should choose and set name to selected buddy", async () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /get options/i })
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /get options/i }));
    const imgs = await screen.findAllByRole("generic", {
      name: /buddy-small/i,
    });
    expect(imgs.length).toBe(9);

    //----

    // await userEvent.click(imgs[0]);
    // await userEvent.type(
    //   screen.getByPlaceholderText(
    //     "give him a name or we'll keep his default one"
    //   ),
    //   "bobi"
    // );
    // await userEvent.click(screen.getByRole("button", { name: /choose one!/i }));
  });
});
export {};
