import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input"; 
import { ThemeProvider } from "../../themes"; 
import { InputProps } from "./Input.types"; 

describe("Input Component", () => {
    const renderInput = (props: Partial<InputProps>) => {
        render(
            <ThemeProvider>
                <Input label="Default Label" {...props} />
            </ThemeProvider>
        );
    };

    test("renders the input with primary theme", () => {
        renderInput({ id: "primary-input", theme: "primary" });

        const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
        expect(input).not.toBeNull(); 
        expect(input.className.includes("primary")).toBe(true); 
    });

    test("renders the input with light theme", () => {
        renderInput({ id: "light-input", theme: "light" });

        const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.className.includes("light")).toBe(true);
    });

    test("handles input change", async () => {
        renderInput({ id: "change-input" });

        const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
        await userEvent.type(input, "Hello");

        expect(input.value).toBe("Hello"); 
    });

    test("renders the input with error theme", () => {
        renderInput({ id: "error-input", theme: "error" });

        const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.className.includes("error")).toBe(true);
    });

    test("renders the input with success theme", () => {
        renderInput({ id: "success-input", theme: "success" });

        const input = screen.getByLabelText(/default label/i) as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.className.includes("success")).toBe(true);
    });

});
