import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "../redux/usersSlice";
import { Box, TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Stack, Select, MenuItem, InputLabel, FormControl, Button, CircularProgress } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Add, Edit, Delete } from "@mui/icons-material";
import UserModal from "./UserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from "react-toastify";

const UsersList = () => {
    const dispatch = useDispatch();

    const { items, status, error } = useSelector((s) => s.users);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("none");
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "idle") dispatch(fetchUsers());
    }, [status, dispatch]);

    console.log(items);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let array = items.slice();
        if (q) array = array.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
        if (sort === "name_ascending") array.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "name_descending") array.sort((a, b) => b.name.localeCompare(a.name));
        if (sort === "company_ascending") array.sort((a, b) => (a.company?.name || "").localeCompare(b.company?.name || ""));
        if (sort === "company_descending") array.sort((a, b) => (b.company?.name || "").localeCompare(a.company?.name || ""));

        return array;
    }, [items, query, sort]);

    const handleAdd = () => {
        setEditing(null);
        setOpenModal(true);
    };

    const handleEdit = (user) => {
        setEditing(user);
        setOpenModal(true);
    };

    const handleDelete = (id) => {
        setDeleteConfirm({ open: true, id });
    };

    const confirmDelete = () => {
        dispatch(deleteUser(deleteConfirm.id));
        setDeleteConfirm({ open: false, id: null });
        toast.success("User deleted successfully");
    };

    const handleSave = (payload) => {
        if (editing) dispatch(updateUser(payload));
        else dispatch(addUser(payload));
        setOpenModal(false);
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Users</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField size="small" placeholder="Search name or email" value={query} onChange={(e) => setQuery(e.target.value)} />

                    <FormControl size="small">
                        <InputLabel>Sort</InputLabel>
                        <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 160 }}>
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="name_ascending">Name (A-Z)</MenuItem>
                            <MenuItem value="name_descending">Name (Z-A)</MenuItem>
                            <MenuItem value="company_ascending">Company (A-Z)</MenuItem>
                            <MenuItem value="company_descending">Company (Z-A)</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>Add User</Button>
                </Stack>
            </Stack>

            <Box mt={2}>
                {status === "loading" && <CircularProgress />}
                {status === "failed" && <Typography color="error">{error}</Typography>}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((u) => (
                            <TableRow
                                key={u.id}
                                hover
                                onClick={() => navigate(`/user/${u.id}`)}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>
                                    <RouterLink
                                        to={`/user/${u.id}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {u.name}
                                    </RouterLink>
                                </TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.company?.name}</TableCell>
                                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(u);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(u.id);
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <UserModal open={openModal} onClose={() => setOpenModal(false)} onSave={handleSave} editing={editing} />
            <ConfirmDeleteModal open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })} onConfirm={confirmDelete} />
        </Paper>
    );
};

export default UsersList;