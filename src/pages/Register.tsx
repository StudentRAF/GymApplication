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

import Header from "../components/Header/Header.tsx";
import { CURRENT_USER_KEY, getLocalStorageData } from "../types/localstorage.ts";
import { getRole } from "../utils.ts";
import { Box } from "@mui/material";
import { mainContainerStyles } from "../styles.ts";
import RegisterManagerForm from "../components/Register/RegisterManagerForm.tsx";
import RegisterClientForm from "../components/Register/RegisterClientForm.tsx";

const Register = () => {
  const userToken = getLocalStorageData(CURRENT_USER_KEY, null);
  const role = getRole(userToken); 

  return (
    <Box component="div" sx={{ height: "100%" }}>
      <Header role={role} name={userToken?.user.firstname}/>
      <Box component="div" sx={mainContainerStyles}>
        {role.name === 'Admin' && <RegisterManagerForm />}
        {role.name === 'Unauthorized' && <RegisterClientForm />}
      </Box>
    </Box>
  )
}

export default Register;
