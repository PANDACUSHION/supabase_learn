import { useState } from 'react';
import supaBase from "../config/supabaseClient.jsx";

const Create = () => {
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!description) {
            setFormError("Please add a description before submitting");
            return; // Stop execution if no description
        }

        try {
            setIsSubmitting(true);
            const { data, error } = await supaBase
                .from('users')
                .insert([{ description }]).select();

            if (error) {
                throw error;
            }

            console.log("Data saved to the DB:", data);
            // Clear form after successful submission
            setDescription('');
            alert("Data saved successfully!");

        } catch (error) {
            console.error("Error saving data:", error.message);
            setFormError("Failed to save data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {formError && <p style={{color: 'red'}}>{formError}</p>}

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="submit"
                    value={isSubmitting ? "Saving..." : "Save To DB"}
                    disabled={isSubmitting}
                />
            </form>
        </>
    )
}

export default Create;