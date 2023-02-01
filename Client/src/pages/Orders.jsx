import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const Orders = () => {
    const {userData} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        console.log(userData, 'userData');
        fetch(`/orders/get-order?user_id=${userData._id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.success) {
                setOrders(res.data);
            }
            else {
                alert('Something went wrong')
            }
        })
        .catch(err => {
            console.log(err, 'error');
            alert('Something went wrong')
        })
    },[]);
  return (
    <>
    <Box>
        {
            orders.length > 0 ? <Stack
            direction='column'
            gap='20px'
            sx={{
                padding: "20px",
                borderRadius: "5px",
                border:'1px solid gray',
                margin: '32px auto',
                width: '40%'
              }}
            >
                {
                    orders.map(el => (
                        <Box border='1px solid #d1d1d1' padding='10px' key={el._id}>
                            <Typography fontSize='20px'>Items :</Typography>
                            {
                                el.items.map(elem => (
                                    <Typography key={elem.name}>{elem.name}</Typography>
                                ))
                            }
                            <Typography fontSize='20px'>Subtotal : <Typography component='span'>₹{el.sub_total}</Typography></Typography>
                        </Box>
                    ))
                }
            </Stack>:
            <Box padding='40vh 0' display='flex' justifyContent='center'>
                <Typography fontSize='30px'>No orders yet</Typography>
            </Box>
        }
    </Box>
    </>
  )
}
