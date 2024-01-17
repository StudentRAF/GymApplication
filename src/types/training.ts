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

import { Gym } from "./gym.ts";

export type TrainingType = {
  name: string
};

export type Training = {
  name:        string,
  type:        TrainingType,
  description: string,
  loyalty:     number
};

export type AppointmentStatus = {
  name: 'Pending' | 'Held' | 'Canceled'
};

export type TrainingAppointment = {
  gym:      Gym,
  training: Training,
  date:     Date,
  time:     Date
  duration: number,
  status:   AppointmentStatus
};

export type UpdateTrainingAppointmentString = {
  gymName:      string,
  trainingName: string,
  date:         string,
  time:         string,
  statusName:   string
}

export type UpdateTrainingAppointment = {
  gymName:      string,
  trainingName: string,
  date:         string,
  time:         string,
  statusName:   string,
  duration?:    number
}
