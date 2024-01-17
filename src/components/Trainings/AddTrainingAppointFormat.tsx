import { Box, Button, CircularProgress, MenuItem, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { componentsHorizontalStyles, componentsVerticalStyles, formStyles } from "../../styles";
import { Pageable } from "../../types/common";
import { GymTraining } from "../../types/gym";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import { UserToken } from "../../types/user";


const AddTrainingAppointmentForm = () => {
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  const [gymTrainings, setGymTrainings] = useState<GymTraining[] | null>(null);
 // const gymName = "Khroming";
  
  useEffect(() => {
     setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    if (userToken == null) return;
    fetch(`http://localhost:8000/api/schedule/gym-training`, {
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
        let data_gym : Pageable<GymTraining> = data as Pageable<GymTraining>;
        return setGymTrainings(data_gym.content);
    })
  }, [userToken])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == null || gymTrainings == null) return;

    const formData: FormData = new FormData(event.currentTarget);

    await fetch("http://localhost:8000/api/schedule/gym-training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (response.status >= 400)
        throw new Error("Invalid data");
      return response.json()
    } )
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  if (userToken == null || gymTrainings == null)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={60} />
      </Box>
    )

    const menuItems = gymTrainings.map(item => (
        <MenuItem key={item.gym.name + " " + item.training.name} value={item.gym.name + " " + item.training.name}>{item.gym.name + " " + item.training.name}</MenuItem>
      ));

      
  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Gym update</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          {/* <TextField id="name" name="name" label="Gym name" defaultValue={gymTrainings} />
          <TextField id="manager" name="manager" label="Manager" defaultValue={gym.manager?.firstname + " " + gym.manager?.lastname} disabled />
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="description" name="description" label="Description" defaultValue={gym.description} />
          <TextField id="trainers" name="trainers" label="Trainers" defaultValue={gym.trainers} /> */}
        </Box>
      </Box>

      <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>
    </Box>
  )
}

export default AddTrainingAppointmentForm
