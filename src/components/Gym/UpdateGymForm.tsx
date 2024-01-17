import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { componentsHorizontalStyles, componentsVerticalStyles, formStyles } from "../../styles";
import { Gym, GymUpdate } from "../../types/gym";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { UserToken } from "../../types/user";
import { Pageable } from "../../types/common";


const UpdateGymForm = () => {
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  const [gym, setGym] = useState<Gym | null>(null);
  const gymName = "Khroming";
  
  useEffect(() => {
     setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    if (userToken == null) return;
    fetch(`http://localhost:8000/api/schedule/gym?name=${gymName}&page=0&size=3`, {
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
      .then(data => {
        let data_gym : Pageable<Gym> = data as Pageable<Gym>;
        return setGym(data_gym.content[0]);
    })
  }, [userToken])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == null || gym == null) return;

    const formData: FormData = new FormData(event.currentTarget);
    let gymUpdate = Object.fromEntries(formData.entries()) as GymUpdate;
    gymUpdate.oldName = gym.name; //save old username before it changes

    await fetch("http://localhost:8000/api/schedule/gym", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      },
      body: JSON.stringify(gymUpdate)
    }).then(response => {
      if (response.status >= 400)
        throw new Error("Invalid data");
      return response.json()
    } )
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  if (userToken == null || gym == null)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={60} />
      </Box>
    )

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Gym update</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="name" name="name" label="Gym name" defaultValue={gym.name} />
          <TextField id="manager" name="manager" label="Manager" defaultValue={gym.manager?.firstname + " " + gym.manager?.lastname} disabled />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="description" name="description" label="Description" defaultValue={gym.description} />
          <TextField id="trainers" name="trainers" label="Trainers" defaultValue={gym.trainers} />
        </Box>
      </Box>

      <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>
    </Box>
  )
}

export default UpdateGymForm
