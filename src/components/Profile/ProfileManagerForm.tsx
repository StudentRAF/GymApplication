import { Box, Button, TextField, Typography } from "@mui/material"
import { componentsHorizontalStyles, componentsVerticalStyles, formStyles } from "../../styles"
import { DatePicker } from "@mui/x-date-pickers"
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorageDataAsync, CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { UserToken, UserUpdate } from "../../types/user";
import dayjs from "dayjs";


const ProfileManagerForm = () => {
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

    await fetch("http://localhost:8000/api/user/manager/update", {
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
      .then(user => {
        userToken.user = user;
        setLocalStorageDataAsync(CURRENT_USER_KEY, userToken).then(() => navigate(0))
      })
      .catch(error => console.log(error));
  }

  if (userToken == null)
    return (<></>)
  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Manager profile</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="firstname" name="firstname" label="First name" defaultValue={userToken.user.firstname} />
          <TextField id="lastname" name="lastname" label="Last name" defaultValue={userToken.user.lastname} />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="username" name="username" label="Username" defaultValue={userToken.user.username} />
          <TextField id="email" name="email" label="Email" defaultValue={userToken.user.email} />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="password" name="password" label="Password" defaultValue={userToken.user.password} type="password" />
          <TextField id="gym" name="gym" label="Gym" defaultValue={userToken.user.gym?.name} disabled />
        </Box>
        <Box sx={componentsHorizontalStyles}>
            <DatePicker name="dateOfBirth" label="Date of birth" defaultValue={dayjs(userToken.user.dateOfBirth)} />
            <DatePicker name="recruitmentDate" label="Recruitment date" defaultValue={dayjs(userToken.user.recruitmentDate)} />
        </Box>
      </Box>

      <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>
    </Box>
  )
}

export default ProfileManagerForm
