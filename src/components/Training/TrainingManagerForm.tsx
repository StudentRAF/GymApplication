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
import { UserToken } from "../../types/user";
import { Pageable } from "../../types/common.ts";
import dayjs from "dayjs";
import {
  AppointmentStatus,
  TrainingAppointment,
  UpdateTrainingAppointment,
  UpdateTrainingAppointmentString
} from "../../types/training.ts";

type TrainingParams = {
  gym:      string,
  training: string,
  date:     string,
  time:     string
}

const TrainingManagerForm = () => {
  const navigate = useNavigate();
  const trainingParams = useParams<TrainingParams>();
  const [userToken, setUserToken] = useState<UserToken>(null);
  const [trainingAppointment, setTrainingAppointment] = useState<TrainingAppointment>();
  const [status, setStatus] = useState<AppointmentStatus>();

  useEffect(() => {
    setUserToken(getLocalStorageData(CURRENT_USER_KEY, null));
  }, []);

  useEffect(() => {
    (async () => {
      if (userToken == null) return;

      const data = await fetch(`http://localhost:8000/api/schedule/training-appointment?gym=${trainingParams.gym}&training=${trainingParams.training}&date=${trainingParams.date}&time=${trainingParams.time}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": userToken.token
        },
      }).then(response => response.json())
        .catch(error => console.log(error)) as Pageable<TrainingAppointment>;

      setStatus(data.content[0].status);
      setTrainingAppointment(data.content[0]);
    })();

  }, [userToken]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userToken == undefined || trainingAppointment == undefined) return;


    const formData: FormData = new FormData(event.currentTarget);

    let appointmentUpdateString = Object.fromEntries(formData.entries()) as UpdateTrainingAppointmentString;
    let appointmentUpdate = appointmentUpdateString as UpdateTrainingAppointment;
    appointmentUpdate.gymName      = trainingAppointment.gym.name;
    appointmentUpdate.trainingName = trainingAppointment.training.name;
    appointmentUpdate.date         = trainingAppointment.date.toString();
    appointmentUpdate.time         = trainingAppointment.time.toString();
    appointmentUpdate.trainingName = trainingAppointment.training.name;
    appointmentUpdate.duration     = trainingAppointment.duration;

    await fetch("http://localhost:8000/api/schedule/training-appointment", {
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

  if (trainingAppointment == undefined || status == undefined || userToken === null)
    return (
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} />
      </Box>
    );

  const changeStatus = (value: AppointmentStatus) => {
    setStatus(value);
  };

  return (
    <Box component="form" sx={formStyles} onSubmit={onSubmit}>
      <Typography variant="h4">Training</Typography>
      <Box sx={componentsVerticalStyles}>
        <TextField name="gymName" label="Gym" defaultValue={trainingAppointment.gym.name} disabled sx={componentFilStyles}/>
        <TextField name="trainingName" label="Training" defaultValue={trainingAppointment.training.name} disabled sx={componentFilStyles}/>
        <Box sx={componentsHorizontalStyles}>
          <DatePicker name="date" label="Date" defaultValue={dayjs(trainingAppointment.date)} disabled sx={componentFixedNormalStyles}/>
          <TimePicker name="time" label="Time" ampm={false} timeSteps={{minutes: 30}} defaultValue={dayjs(trainingAppointment.time, 'HH:mm:ss')} disabled sx={componentFixedNormalStyles}/>
        </Box>
        <Box sx={componentsHorizontalStyles}>
          <TextField name="duration" label="Duration" defaultValue={trainingAppointment.duration + ' minutes'} disabled sx={componentFixedNormalStyles}/>
          {
            (trainingAppointment.status.name === 'Held' || trainingAppointment.status.name === 'Canceled') &&
              <TextField name="status" label="Status" defaultValue={status.name} disabled sx={componentFixedNormalStyles}/>
          }
          {trainingAppointment.status.name === 'Pending' &&
            <FormControl sx={componentFixedNormalStyles}>
            <InputLabel id='status'>Status</InputLabel>
            <Select
              labelId={'status'}
              label={'Status'}
              name={'statusName'}
              MenuProps={{disableScrollLock: true}}
              value={status.name}
            >handleChange('Canceled')
              <MenuItem value={'Pending'} onClick={() => changeStatus({ name: 'Pending' })}>Pending</MenuItem>
              <MenuItem value={'Canceled'} onClick={() => changeStatus({ name:'Canceled' })}>Cancel</MenuItem>
            </Select>
          </FormControl>}
        </Box>
      </Box>
      {trainingAppointment.status.name === 'Pending' && <Button size="large" variant="contained" type="submit">SAVE CHANGES</Button>}
    </Box>
  )
}

export default TrainingManagerForm
