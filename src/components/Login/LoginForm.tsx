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

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEvent } from "react";
import { componentFixedWideStyles, componentsVerticalStyles, formStyles } from "../../styles.ts";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER_KEY, setLocalStorageDataAsync } from "../../types/localstorage.ts";

const LoginForm = () => {
  const navigate = useNavigate();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = new FormData(event.currentTarget);
    await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    }).then(response => response.json())
      .then(user => setLocalStorageDataAsync(CURRENT_USER_KEY, user).then(() => navigate("/")))
      .catch(error => console.log(error));
  }

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Login</Typography>
      <Box sx={componentsVerticalStyles}>
        <TextField id="username" name="username" label="Username" sx={componentFixedWideStyles}/>
        <TextField id="password" name="password" label="Password" sx={componentFixedWideStyles}/>
      </Box>
      <Button size="large" variant="contained" type="submit">Login</Button>
    </Box>
  )
}

export default LoginForm;
