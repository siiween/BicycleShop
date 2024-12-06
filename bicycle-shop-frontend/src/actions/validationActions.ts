import axios from "axios";

export async function validateOptionAsync(
    selectedOptions: Record<number, { id: number; name: string }>,
    optionId: number
) {
    try {
        const {
            data: { data },
        } = await axios.post("http://127.0.0.1:3030/options/forbidden-combinations/validate", {
            selectedOptionIds: Object.values(selectedOptions).map((option) => option.id),
            newOptionId: optionId,
        });
        return data;
    } catch (err: any) {
        console.error("Validation error:", err);
        return {
            message: "Failed to validate option",
            isValid: false,
        };
    }
}
