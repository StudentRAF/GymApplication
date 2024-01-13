/*
 * Copyright (C) 2024. Lazar Dobrota and Nemanja Radovanovic
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DatePicker } from "@mui/x-date-pickers"
import { FormEvent, useEffect, useState } from "react"
import {
  componentFixedNormalStyles,
  componentsHorizontalStyles,
  componentsVerticalStyles,
  formStyles
} from "../../styles"
import { Gym } from "../../types/gym"
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage"
import { UserToken } from "../../types/user"

const RegisterManagerForm = () => {
  const [gym, setGym] = useState('Pannier');
  const [gyms, setGyms] = useState<Gym[] | null>(null);
  const [userToken, setUserToken] = useState<UserToken | null>(null);
  
  useEffect(() => {
     setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    if (userToken == null) return;
    fetch("http://localhost:8000/api/schedule/gym/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      }
    })
      .then(res => res.json())
      .then(res => setGyms(res))
  }, [userToken])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == null || gyms == null) return;

    const formData: FormData = new FormData(event.currentTarget);

    await fetch("http://localhost:8000/api/user/manager/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    }).then(response => {
      if (response.status >= 400)
        throw new Error("Invalid data");
      return response.json()
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  const handleChange = (event: SelectChangeEvent) => {
    setGym(event.target.value);
  };

  if (userToken == null || gyms == null)
    return (
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} />
      </Box>
    );

  const menuItems = gyms.map(item => (
    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
  ));

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Manager register</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="firstname" name="firstname" label="First name" sx={componentFixedNormalStyles}/>
          <TextField id="lastname" name="lastname" label="Last name" sx={componentFixedNormalStyles}/>
        </Box>
        <TextField id="username" name="username" label="Username" />
        <TextField id="email" name="email" label="Email" />
        <TextField id="password" name="password" label="Password" />
        <Box sx={componentsHorizontalStyles}>
          <DatePicker name="dateOfBirth" label="Date of birth" sx={componentFixedNormalStyles}/>
          <Box>
            <FormControl sx={componentFixedNormalStyles}>
              <InputLabel id="gym">Gym name</InputLabel>
              <Select
                labelId="gym"
                id="gymNameSelect"
                label="Gym name"
                name="gym"
                onChange={handleChange}
                value={gym}
                MenuProps={{disableScrollLock: true}}
              >

                {menuItems}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Button size="large" variant="contained" type="submit">REGISTER</Button>
    </Box>
  )
}

export default RegisterManagerForm
