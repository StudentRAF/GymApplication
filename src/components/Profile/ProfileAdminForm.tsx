import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import {
  componentFixedNormalStyles,
  componentsHorizontalStyles,
  componentsVerticalStyles,
  formStyles
} from "../../styles"
import { DatePicker } from "@mui/x-date-pickers"
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorageDataAsync, CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { UserToken, UserUpdate } from "../../types/user";
import dayjs from "dayjs";


const ProfileAdminForm = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<UserToken | null>(null);

  useEffect(() => {
    setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));

  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == null) return;

    const formData: FormData = new FormData(event.currentTarget);
    let userUpdate = Object.fromEntries(formData.entries()) as UserUpdate;
    userUpdate.oldUsername = userToken.user.username; //save old username before it changes

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
    })
      .then(user => {
        userToken.user = user;
        setLocalStorageDataAsync(CURRENT_USER_KEY, userToken).then(() => navigate(0))
      })
      .catch(error => console.log(error));
  }

  if (userToken == null)
    return (
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Admin profile</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="firstname" name="firstname" label="First name" defaultValue={userToken.user.firstname} sx={componentFixedNormalStyles}/>
          <TextField id="lastname" name="lastname" label="Last name" defaultValue={userToken.user.lastname} sx={componentFixedNormalStyles}/>
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="username" name="username" label="Username" defaultValue={userToken.user.username} sx={componentFixedNormalStyles}/>
          <TextField id="email" name="email" label="Email" defaultValue={userToken.user.email} sx={componentFixedNormalStyles}/>
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="password" name="password" label="Password" defaultValue={userToken.user.password} type="password" sx={componentFixedNormalStyles}/>
          <Box>
            <DatePicker name="dateOfBirth" label="Date of birth" defaultValue={userToken.user.dateOfBirth && dayjs(userToken.user.dateOfBirth)} sx={componentFixedNormalStyles}/>
          </Box>
        </Box>
      </Box>

      <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>
    </Box>
  )
}

export default ProfileAdminForm
