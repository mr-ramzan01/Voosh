import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const Home = () => {
  const [item, setItem] = useState([]);
  const items = [
    {
      name: "Paneer Tikka",
      price: 250,
    },
    {
      name: "Ckicken Momos",
      price: 300,
    },
    {
      name: "Kathi Roll",
      price: 120,
    },
    {
      name: "Hyderabadi Biryani",
      price: 350,
    },
    {
      name: "Vanilla Shake",
      price: 280,
    },
  ];

  const handleChange = (e) => {
    const { name, checked, value } = e.target;
    if(checked) {
      setItem([...item, {name: name, price: +value}]);
    }
    else {
      let newItem = item.filter(el => el.name !== name);
      setItem(newItem);
    }
  };

  const handleSubmit = (e) => {
    if(item.length === 0) {
      alert('please select order');
      return;
    }
    e.preventDefault();
    let sub_total = 0;
    item.forEach(el => {
      sub_total+=el.price;
    })
    console.log(sub_total);
    fetch('/orders/add-order', {
      method: 'POST',
      body: JSON.stringify({items: item, sub_total}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        alert('order added successfully');
        window.location.reload();
      }
      else {
        alert('Something went wrong');
        console.log(res, 'response');
      }
      console.log(res, 'response');
    })
    .catch(err => {
      alert('Something went wrong');
      console.log(err, 'error');
    })
    .finally(() => {
      setItem([]);
    })
  };
  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#fff",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            marginTop: 8,
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mt: 2 }} component="h1" variant="h5">
            Create Order
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {items.map((el) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                // border="1px solid green"
                key={el.name}
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox name={el.name} value={el.price} onChange={handleChange}>{el.name}</Checkbox>
                  <Typography>{el.name}</Typography>
                </Stack>
                <Typography m="0 30px">₹{el.price}</Typography>
              </Stack>
            ))}
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 4,
                mb: 4,
                background: "#303030",
                "&:hover": {
                  background: "#000",
                },
              }}
            >
              Place Order 
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
