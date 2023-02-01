import {Box, Stack, Typography} from '@mui/material'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const Navbar = () => {
    const {isAuth} = useContext(AuthContext);
    const logout = () => {
        fetch("/users/loggedOutUser")
        .then((res) => res.json())
        .then((res) => {
            window.location.reload();
            console.log("res", res);
        });
    }
  return (
    <Box width='100%' height='50px' backgroundColor='#303030'>
        <Stack direction='row' height='100%' alignItems='center' padding='0 30px' justifyContent='space-between'>
            <Link style={{textDecoration: 'none', color: '#fff'}} to='/'>
                <Typography>Voosh</Typography>
            </Link>
            <Stack direction='row' gap='20px'>
            <Link style={{textDecoration: 'none', color: '#fff'}} to='/orders'>
                <Typography>My Orders</Typography>
            </Link>
            <Link style={{textDecoration: 'none', color: '#fff'}} to='/login'>
                <Typography>Login</Typography>
            </Link>
            <Link style={{textDecoration: 'none', color: '#fff'}} to='/signup'>
                <Typography>Signup</Typography>
            </Link>
            {isAuth && <Typography color='#fff' onClick={logout} sx={{cursor: 'pointer'}}>Logout</Typography>}
            </Stack>
        </Stack>
    </Box>
  )
}
