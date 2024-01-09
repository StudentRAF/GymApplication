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


import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DatePicker } from "@mui/x-date-pickers"
import { FormEvent, useState } from "react"
import { redirect } from "react-router-dom"
import { componentsHorizontalStyles, componentsVerticalStyles, formStyles } from "../../styles"

const onSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData: FormData = new FormData(event.currentTarget);
  fetch("http://localhost:8000/api/user/client/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Object.fromEntries(formData.entries()))
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
    
    redirect("/"); //home :)
}


const RegisterClientForm = () => {
  const [gender, setGender] = useState('Male');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };
  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Register</Typography>
      <Box sx={componentsVerticalStyles}>
        <Box sx={componentsHorizontalStyles}>
          <TextField id="firstname" name="firstname" label="First name" />
          <TextField id="lastname" name="lastname" label="Last name" />
        </Box>
        <TextField id="username" name="username" label="Username" />
        <TextField id="email" name="email" label="Email" />
        <TextField id="password" name="password" label="Password" />
        <Box sx={componentsHorizontalStyles}>
          <DatePicker name="dateOfBirth" label="Date of birth" />
          <Box>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="genderSelect"
                label="Gender"
                onChange={handleChange}
                value={gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Button size="large" variant="contained" type="submit">REGISTER</Button>
    </Box>
  )
}

export default RegisterClientForm

