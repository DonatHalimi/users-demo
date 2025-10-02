import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this user?</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="error" variant="contained" onClick={onConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;