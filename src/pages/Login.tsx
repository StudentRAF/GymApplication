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
import { Role } from "../types.ts";
import Typography from "@mui/material/Typography";

const Login = () => {
  return (
    <>
      <Header role={Role.CLIENT}/>
      <Typography variant='h4'>Login</Typography>
    </>
  )
}

export default Login;
