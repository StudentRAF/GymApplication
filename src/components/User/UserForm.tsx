import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FormEvent, useEffect, useState } from "react";
import { componentsHorizontalStyles, componentsVerticalStyles, formStyles } from "../../styles";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { User, UserToken, UserUpdate } from "../../types/user";
import { useParams } from "react-router-dom";

type UserParams = {
  username: string
}

const AdminUpdateUserFormat = () => {
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userParams =useParams<UserParams>();

  useEffect(() => {
     setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    if (userToken == null) return;
    fetch(`http://localhost:8000/api/user/?username=${userParams.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      }
    })
      .then(res => {
        if (res.status >= 400)
            throw new Error("Invalid data")
        return res.json();
    })
      .then(res => {
        setUser(res)
    })
  }, [userToken])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == null) return;

    const formData: FormData = new FormData(event.currentTarget);
    let userUpdate = Object.fromEntries(formData.entries()) as UserUpdate;
    userUpdate.oldUsername = user?.username; //save old username before it changes

    await fetch("http://localhost:8000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      },
      body: JSON.stringify(userUpdate)
    }).then(response => {
      if (response.status >= 400)
        throw new Error("Invalid data");
      return response.json()
    } )
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  if (userToken == null || user == null)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={60} />
      </Box>
    )

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">User Update</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="firstname" name="firstname" label="First name" defaultValue={user.firstname} />
          <TextField id="lastname" name="lastname" label="Last name" defaultValue={user.lastname} />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="username" name="username" label="Username" defaultValue={user.username} />
          <TextField id="email" name="email" label="Email" defaultValue={user?.email} />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="password" name="password" label="Password" defaultValue={user.password} type="password" />
          <TextField id="gym" name="gym" label="Gym" defaultValue={user.gym === null ? "Not working" : user.gym?.name} disabled />
        </Box>
        <Box sx={componentsHorizontalStyles}>
            <DatePicker name="dateOfBirth" label="Date of birth" defaultValue={user.dateOfBirth && dayjs(user.dateOfBirth)} />
            <DatePicker name="recruitmentDate" label="Recruitment date" defaultValue={user.recruitmentDate && dayjs(user.recruitmentDate)} disabled />
        </Box>
      </Box>

      <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>
    </Box>
  )
}

export default AdminUpdateUserFormat
