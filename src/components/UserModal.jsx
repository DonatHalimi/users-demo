import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from "@mui/material";
import { toast } from "react-toastify";

const UserModal = ({ open, onClose, onSave, editing }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editing) {
            setName(editing.name || "");
            setEmail(editing.email || "");
            setCompany(editing.company?.name || "");
        } else {
            setName("");
            setEmail("");
            setCompany("");
        }
        setErrors({});
    }, [editing, open]);

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "Name is required";
        if (!email.trim()) e.email = "Email is required";
        setErrors(e);

        if (Object.keys(e).length > 0) {
            toast.error("Please fill in all required fields");
        }

        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const payload = {
            id: editing ? editing.id : `local-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            company: { name: company.trim() },
            phone: editing?.phone || "",
            website: editing?.website || "",
            address: editing?.address || null,
        };

        onSave(payload);

        if (editing) {
            toast.success("User updated successfully");
        } else {
            toast.success("User added successfully");
        }

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{editing ? "Edit User" : "Add User"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Name *" value={name} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name} fullWidth />
                    <TextField label="Email *" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} fullWidth />
                    <TextField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>{editing ? "Save" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
