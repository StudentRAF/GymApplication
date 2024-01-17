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
import { Training, TrainingAppointment } from "./training.ts";

export type RoleType = {
  name: 'Client'| 'Manager' | 'Admin' | 'Unauthorized'
};

export type User = {
  username:         string,
  firstname:        string,
  lastname:         string,
  userRole:         RoleType,
  email:            string,
  password:         string,
  dateOfBirth?:     string,
  membershipId?:    string,
  recruitmentDate?: Date,
  gym?:             Gym,
  access:           boolean,
  activated:        boolean
};

export type UserAdminUpdate = {
  username:         string,
  oldUsername?:     string,
  firstname:        string,
  lastname:         string,
  email:            string,
  password:         string,
  dateOfBirth?:     string,
  membershipId?:    string,
  recruitmentDate?: string,
  gym?:             string,
  access?:           boolean
};

export type UserString = {
  username:         string,
  oldUsername?:     string,
  firstname:        string,
  lastname:         string,
  email:            string,
  password:         string,
  dateOfBirth?:     string,
  membershipId?:    string,
  recruitmentDate?: string,
  gym?:             string
};

export type UserUpdate = {
  username:         string,
  oldUsername?:     string,
  firstname:        string,
  lastname:         string,
  email:            string,
  password:         string,
  dateOfBirth?:     string,
  membershipId?:    string,
  recruitmentDate?: string,
  gym?:             string
};

export type UserToken = {
  user:  User,
  token: string
} | null;

export type UserTraining = {
  user:     User,
  training: Training,
  count:    number
};

export type UserAppointmentStatus = {
  name: 'Canceled' | 'Held' | 'Requested';
};

export type UserTrainingAppointment = {
  trainingAppointment: TrainingAppointment,
  client:              User,
  status:              UserAppointmentStatus
};

export type UpdateUserTrainingAppointment = {
  gymName:      string,
  trainingName: string,
  date:         string,
  time:         string,
  statusName:   string,
}
