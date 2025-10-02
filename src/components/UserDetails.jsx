import { useParams, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Stack, Typography, Button, Box } from "@mui/material";

const UserDetails = () => {
    const { id } = useParams();
    const user = useSelector((s) => s.users.items.find((u) => String(u.id) === String(id)));

    if (!user) return <Typography>User not found</Typography>;

    console.log(user);

    return (
        <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{user.name}</Typography>
                    <Button component={RouterLink} to="/">Back</Button>
                </Stack>

                <Typography variant="subtitle2">Email</Typography>
                <Typography>{user.email}</Typography>

                <Typography variant="subtitle2">Phone</Typography>
                <Typography>{user.phone || "Not found"}</Typography>

                <Typography variant="subtitle2">Website</Typography>
                <Typography>{user.website || "Not found"}</Typography>

                <Box>
                    <Typography variant="subtitle2">Address</Typography>
                    {user.address ? (
                        <Typography>
                            {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
                        </Typography>
                    ) : (
                        <Typography>Not found</Typography>
                    )}
                </Box>

                <Box>
                    <Typography variant="subtitle2">Company</Typography>
                    <Typography>{user.company?.name || "Not found"}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

export default UserDetails;