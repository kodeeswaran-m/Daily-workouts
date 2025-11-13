import { render, screen, fireEvent } from "@testing-library/react";
import FormControl from "./FormControl";

describe("FormControl Component", () => {
  test("renders an input by default", () => {
    render(<FormControl label="Name" placeholder="Enter name" value="" onChange={() => {}} />);
    
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    
    const input = screen.getByPlaceholderText(/enter name/i);// Google Tag Manager // 
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  test("renders a textarea when 'as' prop is 'textarea'", () => {
    render(<FormControl label="Bio" as="textarea" placeholder="Enter bio" value="" onChange={() => {}} />);
    
    const textarea = screen.getByPlaceholderText(/enter bio/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  test("renders a select with options when 'as' prop is 'select'", () => {
    const options = [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
    ];
    render(<FormControl label="Choices" as="select" value="" onChange={() => {}} options={options} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    
    // Check options
    expect(screen.getByText(/select an option/i)).toBeInTheDocument();
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<FormControl label="Name" placeholder="Enter name" value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/enter name/i);
    fireEvent.change(input, { target: { value: "John" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("shows error message when 'error' prop is passed", () => {
    render(<FormControl label="Email" placeholder="Enter email" value="" onChange={() => {}} error="Required" />);

    const errorMsg = screen.getByText(/required/i);
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveClass("form-control-error");
  });

  // test("applies size classes correctly", () => {
  //   const { rerender } = render(<FormControl label="Name" size="sm" value="" onChange={() => {}} />);
  //   let input = screen.getByLabelText(/name/i);
  //   expect(input).toHaveClass("form-sm");

  //   rerender(<FormControl label="Name" size="lg" value="" onChange={() => {}} />);
  //   input = screen.getByLabelText(/name/i);
  //   expect(input).toHaveClass("form-lg");
  // });
});
