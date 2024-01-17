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

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material"
import {
  componentFilStyles,
  componentFixedNormalStyles,
  componentsHorizontalStyles,
  componentsVerticalStyles,
  formStyles
} from "../../styles"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CURRENT_USER_KEY, getLocalStorageData } from "../../types/localstorage";
import {
  UpdateUserTrainingAppointment,
  UserAppointmentStatus,
  UserToken,
  UserTrainingAppointment
} from "../../types/user";
import { Pageable } from "../../types/common.ts";
import dayjs from "dayjs";

type TrainingParams = {
  gym:      string,
  training: string,
  date:     string,
  time:     string
}

const TrainingClientForm = () => {
  const navigate = useNavigate();
  const trainingParams = useParams<TrainingParams>();
  const [userToken, setUserToken] = useState<UserToken>(null);
  const [userTrainingAppointment, setUserTrainingAppointment] = useState<UserTrainingAppointment>();
  const [status, setStatus] = useState<UserAppointmentStatus>();

  useEffect(() => {
    setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    (async () => {
      if (userToken == null) return;

      const data = await fetch(`http://localhost:8000/api/schedule/client-training-appointment?gym=${trainingParams.gym}&training=${trainingParams.training}&date=${trainingParams.date}&time=${trainingParams.time}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken.token
        },
      }).then(response => response.json())
        .catch(error => console.log(error)) as Pageable<UserTrainingAppointment>;

      setStatus(data.content[0].status);
      setUserTrainingAppointment(data.content[0]);
    })();

  }, [userToken]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == undefined || userTrainingAppointment == undefined) return;


    const formData: FormData = new FormData(event.currentTarget);

    let appointmentUpdate = Object.fromEntries(formData.entries()) as UpdateUserTrainingAppointment;
    appointmentUpdate.gymName      = userTrainingAppointment.trainingAppointment.gym.name;
    appointmentUpdate.trainingName = userTrainingAppointment.trainingAppointment.training.name;
    appointmentUpdate.date         = userTrainingAppointment.trainingAppointment.date.toString();
    appointmentUpdate.time         = userTrainingAppointment.trainingAppointment.time.toString();

    await fetch("http://localhost:8000/api/schedule/client-training-appointment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken.token
      },
      body: JSON.stringify(appointmentUpdate)
    }).then(response => {
      if (response.status >= 400)
        throw new Error("Invalid data");
      return response.json()
    }).then(() => navigate(0))
      .catch(error => console.log(error));
  }

  if (userTrainingAppointment == undefined || status == undefined || userToken === null)
    return (
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} />
      </Box>
    );

  const changeStatus = (value: UserAppointmentStatus) => {
    setStatus(value);
  };

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Training</Typography>
      <Box sx={componentsVerticalStyles}>
        <TextField name="username" label="Username" defaultValue={userToken .user.firstname} disabled sx={componentFilStyles}/>
        <TextField name="gymName" label="Gym" defaultValue={userTrainingAppointment.trainingAppointment.gym.name} disabled sx={componentFilStyles}/>
        <TextField name="trainingName" label="Training" defaultValue={userTrainingAppointment.trainingAppointment.training.name} disabled sx={componentFilStyles}/>
        <Box sx={componentsHorizontalStyles}>
          <DatePicker name="date" label="Date" defaultValue={dayjs(userTrainingAppointment.trainingAppointment.date)} disabled sx={componentFixedNormalStyles}/>
          <TimePicker name="time" label="Time" ampm={false} timeSteps={{minutes: 30}} defaultValue={dayjs(userTrainingAppointment.trainingAppointment.time, 'HH:mm:ss')} disabled sx={componentFixedNormalStyles}/>
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField name="duration" label="Duration" defaultValue={userTrainingAppointment.trainingAppointment.duration + ' minutes'} disabled sx={componentFixedNormalStyles}/>
          {
            (userTrainingAppointment.status.name === 'Held' || userTrainingAppointment.status.name === 'Canceled') &&
              <TextField name="status" label="Status" defaultValue={status.name} disabled sx={componentFixedNormalStyles}/>
          }
          {userTrainingAppointment.status.name === 'Requested' &&
            <FormControl sx={componentFixedNormalStyles}>
            <InputLabel id='status'>Status</InputLabel>
            <Select
              labelId={'status'}
              label={'Status'}
              name={'statusName'}
              MenuProps={{disableScrollLock: true}}
              value={status.name}
            >handleChange('Canceled')
              <MenuItem value={'Requested'} onClick={() => changeStatus({ name:'Requested' })}>Requested</MenuItem>
              <MenuItem value={'Canceled'} onClick={() => changeStatus({ name:'Canceled' })}>Cancel</MenuItem>
            </Select>
          </FormControl>}
        </Box>
      </Box>
      {userTrainingAppointment.status.name === 'Requested' && <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>}
    </Box>
  )
}

export default TrainingClientForm
